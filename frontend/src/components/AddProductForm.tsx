import React, { useState, useRef } from 'react';
import { CreateProductRequest, FormErrors,UserInProduct } from '@/types/product';
import { X } from 'lucide-react';
import { useRouter } from 'next/navigation';



interface AddProductFormProps {
  productId?: string;
  onProductAdded?: () => void;
}

const AddProductForm: React.FC<AddProductFormProps> = ({ productId, onProductAdded }) => {
  const [formData, setFormData] = useState<CreateProductRequest>({
    name: '',
    price: 0,
    description: '',
    users: {
      _id: "",
      _ref: "users",
      name: ""
    }
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<string>('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [user, setUser] = useState<UserInProduct>();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const route = useRouter()

  React.useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setUser({
        name: `${userData.firstName} ${userData.lastName}`,
        _id: userData.id,
        _ref: "users"
      });
    }
  }, []);

  React.useEffect(() => {
    if (productId) {
      const token = localStorage.getItem('token');
      fetch(`http://localhost:3001/api/products/${productId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
        .then(res => {
          if (!res.ok) throw new Error('Failed to fetch product');
          return res.json();
        })
        .then(data => {
          const product = data.data;
          setFormData({
            name: product.name || '',
            price: product.price || 0,
            description: product.description || '',
            users: {
              name: user ? user.name : '',
              _id: user ? user._id : '',
              _ref: 'users'
            }
          });
          if (product.imageUrl) {
            setImagePreview(product.imageUrl);
          }
        })
        .catch(() => {
          setMessage('Failed to load product data for editing.');
        });
    }
  }, [productId]);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Product name is required';
    }

    if (formData.price <= 0) {
      newErrors.price = 'Price must be a positive number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    console.log("user and form data :: ",user,formData);
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    setIsSubmitting(true);
    setMessage('');
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('price', formData.price.toString());
      if (formData.description) {
        formDataToSend.append('description', formData.description);
      }
      if (formData.image) {
        formDataToSend.append('image', formData.image);
      }      
      if (user) {
        formDataToSend.append(
          'user',
          JSON.stringify({
            name: user.name,
            _id: user._id,
            _ref: "users"
          })
        );
      } else {
      console.log("checking final object ::",formDataToSend);
    }
      
      const method = productId ? 'PUT' : 'POST';
      const url = productId ? `http://localhost:3001/api/products/${productId}` : 'http://localhost:3001/api/products';
      const token = localStorage.getItem('token');
      const res = await fetch(url, {
        method,
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formDataToSend,
      });
      if (res.ok) {
        setFormData({ name: '', price: 0, description: '',users: { name: '', _id: '',_ref: 'users'}
         });
        setImagePreview(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
        setMessage(productId ? 'Product updated successfully!' : 'Product added successfully!');
        route.push('/profile');
        if (onProductAdded) {
          onProductAdded();
        }
      } else {
        setMessage('Failed to save product. Please try again.');
      }
    } catch (error) {
      setMessage('Error saving product. Please try again.');
    }
    setIsSubmitting(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'price' ? parseFloat(value) || 0 : value,
    }));
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = (e.target.files && e.target.files.length > 0) ? e.target.files[0] : undefined;
    if (file) {
      setFormData(prev => ({
        ...prev,
        image: file,
      }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setFormData(prev => ({
        ...prev,
        image: undefined,
      }));
      setImagePreview(null);
    }
  };
  const removeImage = () => {
    setFormData(prev => ({
      ...prev,
      image: undefined,
    }));
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };
console.log("checking user data ::: ",user);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">{productId ? 'Edit Product' : 'Add New Product'}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Product Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className={`mt-1 block w-full px-3 py-2 border ${
              errors.name ? 'border-red-500' : 'border-gray-300'
            } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
            placeholder="Enter product name"
          />
          {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
        </div>

        <div>
          <label htmlFor="price" className="block text-sm font-medium text-gray-700">
            Price *
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            step="0.01"
            min="0"
            className={`mt-1 block w-full px-3 py-2 border ${
              errors.price ? 'border-red-500' : 'border-gray-300'
            } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
            placeholder="Enter price"
          />
          {errors.price && <p className="mt-1 text-sm text-red-600">{errors.price}</p>}
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            rows={3}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter product description (optional)"
          />
        </div>

        <div>
          <label htmlFor="image" className="block text-sm font-medium text-gray-700">
            Product Image
          </label>
          <input
            type="file"
            id="image"
            name="image"
            ref={fileInputRef}
            onChange={handleImageChange}
            accept="image/*"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
          {imagePreview && (
            <div className="mt-2 relative inline-block">
              <img 
                src={imagePreview} 
                alt="Preview" 
                className="w-32 h-32 object-cover rounded-md border"
              />
              <button
                type="button"
                onClick={removeImage}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs"
              >
                <X />
              </button>
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
        >
          {isSubmitting ? (productId ? 'Updating Product...' : 'Adding Product...') : (productId ? 'Update Product' : 'Add Product')}
        </button>

        {message && (
          <p className={`text-sm ${message.includes('Error') ? 'text-red-600' : 'text-green-600'}`}>
            {message}
          </p>
        )}
      </form>
    </div>
  );
};

export default AddProductForm;
