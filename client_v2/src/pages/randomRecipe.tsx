import { useState } from "react";
import axios from "axios";
import "./RandomRecipe.css";
import DefaultLayout from "@/layouts/default";
import { Button } from "@nextui-org/button";
import { Image } from "@nextui-org/image";
import { Card, CardBody } from "@nextui-org/card";
import TinderCard from 'react-tinder-card';

export default function RandomRecipe() {
    const [recipe, setRecipe] = useState({});

    const getRandomRecipe = async () => {
        try {
            const res = await axios.get("http://localhost:8080/random-recipe");

            setRecipe(res.data.recipe);
        } catch (e) {
            throw new Error(e);
        }
    };

    const renderIngredients = (ingredients) => {

        return (
            <ul className="ingredients-list">
                {ingredients.map((ingredient) => {
                    return <li>{ingredient.original}</li>;
                })}
            </ul>
        );
    };

    const renderSteps = (steps) => {
        return (
            <ol className="steps-list">
                {steps.map((step) => {
                    return <li>{step.step}</li>;
                })}
            </ol>
        );
    };

    return (
        <DefaultLayout>
            <Button onClick={getRandomRecipe}>Get Random Recipe</Button>
            {Object.keys(recipe).length > 0 && (
                <div className="max-w-lg mt-4">
                    <TinderCard preventSwipe={['right', 'left']}>
                        <Card className="p-4">
                            <CardBody>
                                <div>
                                    <Image draggable={false} src={recipe.image} alt={recipe.title} />
                                    <h3 draggable={false} className="mt-4">{recipe.title}</h3>
                                    <h4 draggable={false} className="mt-4">Time To Cook: {recipe.readyInMinutes} Minutes</h4>
                                </div>
                                {/* <div className="flex justify-center">
                                    {renderIngredients(recipe.extendedIngredients)}
                                    {renderSteps(recipe.analyzedInstructions[0].steps)}
                                </div> */}
                            </CardBody>
                        </Card>
                    </TinderCard>
                </div>
            )}
        </DefaultLayout>
    );
}
