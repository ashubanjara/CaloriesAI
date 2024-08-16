import { useState, useEffect } from "react";
import axios from "axios";
import "./RandomRecipe.css";
import DefaultLayout from "@/layouts/default";
import { Button } from "@nextui-org/button";
import { Image } from "@nextui-org/image";
import { Card, CardBody } from "@nextui-org/card";
import TinderCard from 'react-tinder-card';

export default function RandomRecipe() {
    const [loadedRecipes, setLoadedRecipes] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const initRecipes = async () => {
        setIsLoading(true);
        const data = await loadRecipes(20)
        setLoadedRecipes(data)
        setIsLoading(false);
    }

    const loadRecipes = async (numRecipes) => {
        try {
            const res = await axios.get(`http://localhost:8080/random-recipe?number=${numRecipes}`);
            
            return res.data.recipes
        } catch (e) {
            throw new Error(e);
        }
        finally {
        }
    };

    const onCardLeftScreen = async (id) => {
        const newLoadedRecipes = structuredClone(loadedRecipes)

        if (loadedRecipes.length < 6) {
            const data = await loadRecipes(19)
            for (let i = 0; i < data.length; i++) {
                newLoadedRecipes.unshift(data[i])
            }
        }

        newLoadedRecipes.pop()

        setLoadedRecipes(newLoadedRecipes)
        console.log(id)
      }

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
            <div className="flex flex-col justify-center items-center">
                {console.log(loadedRecipes)}
                <Button isLoading={isLoading} onClick={initRecipes}>Start Browsing Recipies</Button>
                {loadedRecipes.length > 0 && loadedRecipes.map(recipe =>
                    <TinderCard className="max-w-lg mt-4 absolute top-52" key={recipe.id} onCardLeftScreen={(id) => onCardLeftScreen(id)}>
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
                )}
            </div>
        </DefaultLayout>
    );
}
