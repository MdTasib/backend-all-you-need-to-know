const express = require("express");
const {
	getProduct,
	createProduct,
	bulkUpdateProduct,
	updateProductById,
	deleteProductById,
	bulkDeleteProducts,
	fileUpload,
} = require("../controllers/product.controller");
const authorization = require("../middlewares/authorization");
const uploader = require("../middlewares/uploader");
const verifyToken = require("../middlewares/verifyToken");
const router = express.Router();

// FILE UPLOAD
// EXAMPLE FOR CLIENT SIDE
{
	/* <input type='file' name='image' />;
const formData = new FormData();
formData.append("image", formData); */
}

// SINGLE IMAGE UPLOAD
// router.post("/file-upload", uploader.single("image"), fileUpload);

// MULTIPLE IMAGES UPLOAD
router.post("/file-upload", uploader.array("image"), fileUpload);

router.route("/bulk-update").patch(bulkUpdateProduct);
router.route("/bulk-delete").delete(bulkDeleteProducts);

router
	.route("/")
	.get(getProduct)
	.post(verifyToken, authorization("admin", "store-manager"), createProduct);

router.route("/:id").patch(updateProductById).delete(deleteProductById);

module.exports = router;
