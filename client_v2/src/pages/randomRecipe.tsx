import { useState, useRef, useMemo, createRef } from "react";
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
    const [currentIndex, setCurrentIndex] = useState(0);
    const currentIndexRef = useRef(currentIndex);

    const initRecipes = async () => {
        setIsLoading(true);
        const data = await loadRecipes(20);
        setCurrentIndex(data.length - 1)
        setLoadedRecipes(data);
        setIsLoading(false);
    };

    const loadRecipes = async (numRecipes) => {
        try {
            setIsLoading(true);
            const res = await axios.get(`http://localhost:8080/random-recipe?number=${numRecipes}`);
            return res.data.recipes;
        } catch (e) {
            throw new Error(e);
        }
        finally {
            setIsLoading(false);
        }
    };

    const onCardLeftScreen = async (id) => {
        console.log(id)
      }

    const childRefs = useMemo(
        () =>
            Array(loadedRecipes.length)
                .fill(0)
                .map(() => createRef()),
        [loadedRecipes.length]
    );

    const updateCurrentIndex = (val) => {
        setCurrentIndex(val);
        currentIndexRef.current = val;
    };

    const swipe = async (dir) => {
        if (currentIndex < loadedRecipes.length) {
            console.log(currentIndex)
            updateCurrentIndex(currentIndex - 1);
            await childRefs[currentIndex].current.swipe(dir);
            if (currentIndex <= 6) {
                const newLoadedRecipes = structuredClone(loadedRecipes)
                const data = await loadRecipes(19)
                for (let i = 0; i < data.length; i++) {
                    newLoadedRecipes.unshift(data[i])
                }
                setLoadedRecipes(newLoadedRecipes)
                setCurrentIndex(data.length + 5)
            }
        }
        console.log(loadedRecipes)
    };

    const renderIngredients = (ingredients) => {
        return (
            <ul className="ingredients-list">
                {ingredients.map((ingredient, index) => (
                    <li key={index}>{ingredient.original}</li>
                ))}
            </ul>
        );
    };

    const renderSteps = (steps) => {
        return (
            <ol className="steps-list">
                {steps.map((step, index) => (
                    <li key={index}>{step.step}</li>
                ))}
            </ol>
        );
    };

    return (
        <DefaultLayout>
            <div className="flex flex-col justify-between items-center h-3/4">
                <Button isLoading={isLoading} onClick={initRecipes}>
                    Start Browsing Recipes
                </Button>
                {loadedRecipes.length > 0 && loadedRecipes.map((recipe, index) =>
                    recipe.image && (
                        <TinderCard
                            ref={childRefs[index]}
                            className="max-w-lg mt-4 absolute top-52 z-10"
                            key={recipe.id}
                            onCardLeftScreen={() => onCardLeftScreen(recipe.id)}
                        >
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
                    )
                )}
                {loadedRecipes.length > 0 && (
                    <div className="flex items-center">
                        <Button isLoading={isLoading} variant="solid" color="danger" className="mr-10" onClick={() => swipe('left')}>
                            Not a Fan
                        </Button>
                        <Button isLoading={isLoading} variant="solid" color="secondary" onClick={() => swipe('right')}>
                            I Like This
                        </Button>
                    </div>
                )}
            </div>
        </DefaultLayout>
    );
}