import express from "express";
import { ProductModel } from "./model.js";

const productsRouter = express.Router();

productsRouter.get("/", async (req, res) => {
  const products = await ProductModel.find({});

  res.send(products || []);
});

productsRouter.post("/", async (req, res) => {
  console.log(req.body);
  const { name, price } = req.body;

  if (!name || !price) {
    res.status(400).send({ error: "name and price are required" });
    return;
  }
  const product = new ProductModel({ name, price });
  await product.save();

  console.log(product);

  res.status(201).send({ product });
});

productsRouter.get("/:id", async (req, res) => {
  const id = req.params.id;
  const product = await ProductModel.findById(id);

  if (product) {
    res.send(product);
  } else {
    res.status(404).send();
  }
});

productsRouter.delete("/:id", async (req, res) => {
  const id = req.params.id;
  const deletedProduct = await ProductModel.findByIdAndDelete(id);

  if (deletedProduct) {
    res.status(204).send();
  } else {
    res.status(404);
  }
});

export { productsRouter };
