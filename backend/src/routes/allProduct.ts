import express, { Request, Response } from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import mongoose from 'mongoose';
import Products, { IProducts } from '../models/allProduct';
import { authenticateToken } from '../middleware/authMiddleware';

const router = express.Router();
const uploadDir = path.join(__dirname, '../../uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'));
    }
  }
});

router.post('/', authenticateToken, upload.single('image'), async (req: Request, res: Response) => {
  try {
    const { name, price, description, user } = req.body; // note: user, not users
    console.log("checking req.body : ", req.body);

    if (!name || !price) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    let usersData;
    if (user) {
      try {
        usersData = JSON.parse(user);
      } catch (err) {
        return res.status(400).json({ message: "Invalid user data" });
      }
    } else {
      return res.status(400).json({ message: "User is required" });
    }
    const productData: any = {
      name,
      price,
      description,
      users: usersData, 
    };
    if (req.file) {
      productData.imagePath = `/uploads/${req.file.filename}`;
    }

    const newProduct: IProducts = new Products(productData);
    console.log("checking newProduct ::", newProduct);

    const savedProduct = await newProduct.save();
    res.status(201).json({
      message: "Product submitted successfully",
      data: savedProduct,
    });
  } catch (err: any) {
    console.error("Error saving Product:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get('/', async (req: Request, res : Response)=>{
    try{
        const userId = req.query.userId as string | undefined;
        let products;
        if (userId) {
            products = await Products.find({ 'users._id': userId });
        } else {
            products = await Products.find();
        }
        res.json({data: products})
    }catch(err){
        console.error("Failed to fetch product", err);
        res.status(500).json("Failed to fetch product")
    }
})

router.get('/user/:userId', async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;
        console.log("checking user id :::",userId);
        
        let query: any = { 'users._id': userId };
        try {
            const objectId = new mongoose.Types.ObjectId(userId);
            query = { 'users._id': objectId };
        } catch (err) {
            query = { 'users._id': userId };
        }
        const products = await Products.find(query);
        res.json({ data: products });
    } catch (err) {
        console.error("Failed to fetch products by userId :::: ", err);
        res.status(500).json({ message: "Failed to fetch products by userId" });
    }
});

router.get('/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const product = await Products.findById(id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.json({ data: product });
    } catch (err) {
        console.error("Get product error:", err);
        res.status(500).json({ message: "Server error" });
    }
});

router.delete("/:id", authenticateToken, async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Products.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    await Products.findByIdAndDelete(id);
    res.json({ message: "Product deleted successfully" });
  } catch (err) {
    console.error("Delete product error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

router.put("/:id", authenticateToken, upload.single('image'), async (req, res) => {
  const { id } = req.params;
  try {
    const { name, price, description } = req.body;    
    if (!name || !price) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    const updateData: any = {
      name,
      price,
      description
    };
    if (req.file) {
      updateData.imagePath = `/uploads/${req.file.filename}`;
    }
    const updatedProduct = await Products.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );
    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json({
      message: "Product updated successfully",
      data: updatedProduct,
    });
  } catch (err: any) {
    console.error("Update product error:", err);
    res.status(500).json({ message: "Server error" });
  }
});



export default router;
