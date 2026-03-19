const reviewsController = {};

import reviewModel from "../models/reviews.js"

//SELECT
reviewsController.getReviews = async (req, res) => {
    const reviews = await reviewModel.find().populate("idEmployee", "name lastName").populate("idProducts", "name description");
    res.json(reviews)
}

//INSERT
reviewsController.insertReview = async (req, res) => {

    const {idEmployee, idProducts, rating, comment} = req.body;

    const newReview = new reviewModel({
        idEmployee,
        idProducts,
        rating,
        comment
    })
    
    await newReview.save();

    res.json({message: "Review Saved", data: newReview.populate("idEmployee", "name lastName").populate("idProducts", "name description")})

}

//ELIMINAR
reviewsController.deleteReview = async (req, res) => {
    await reviewModel.findByIdAndDelete(req.params.id)
    res.json({message: "Review deleted"})
}

//UPDATE
reviewsController.updateReview = async (req, res) => {
    
    const {idEmployee, idProducts, rating, comment} = req.body;

    //Actualizamos
    await reviewModel.findByIdAndUpdate(
        req.params.id,
        {
            idEmployee,
            idProducts,
            rating,
            comment
        },
        {
            new: true
        }
    );

    res.json({message: "Review updated"})
}
