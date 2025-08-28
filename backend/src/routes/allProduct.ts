import express, { Request, Response } from 'express';
import Products, { IProducts } from '../models/allProduct';

const router = express.Router();

// POST 
router.post('/', async (req: Request, res: Response) => {
  try {
    const { name, price, description } = req.body;
    console.log("checking req.body : ",req.body);
    
    if (!name || !price ) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    const newProdcut: IProducts = new Products({
      name,
      price,
      description
    });
    const savedProduct = await newProdcut.save();

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
        const products = await Products.find()
        res.json({data: products})
    }catch{
        res.status(500).json("Failed to fetch product")
    }
})

router.delete("/:id", async (req, res) => {
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



export default router;
