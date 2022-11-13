import "./App.css";
import {useState, useEffect, useCallback} from "react";
import Header from "./Header";
import Mainboard from "./Mainboard";
import unsplash from "../api/unsplash";
import CategoryItem from "./CategoryItem";
import {FlexStyled} from "../styledCss/FlexStyled";
import AddImageModal from "./AddImageModal";

// import db from "../firebase";

function App() {
    const [pins, setNewPins] = useState([]);
    /* TODO get list categgory */
    /* TODO function set category */
    const [category, setCategory] = useState(["all", "ocean", "Tokyo", "dogs", "cats"])
    const [activeCategory, setActiveCategory] = useState(["all"])
    const [showAddImageModal , toggleAddImageModal] = useState(false);


    const getImages = (term) => {
        return unsplash.get("https://api.unsplash.com/search/photos", {
            params: {query: term},
        });
    };

    const onSearchSubmit = (term) => {
        getImages(term).then((res) => {
            let results = res.data.results;
            let newPins = [
                ...results,
                ...pins
            ]
            /* TODO shuffle array */
            newPins.sort(function (a, b) {
                return 0.5 - Math.random();
            });
            setNewPins(newPins);
        })
    };


    const toggleMenuCategory = useCallback((category) => {
        if (activeCategory.includes(category)) {
            setActiveCategory(activeCategory.filter(item => item !== category))
            /* TODO : need call api */
        } else {
            setActiveCategory([...activeCategory, category])
            onSearchSubmit(category)
        }
    }, [category, activeCategory])


    const getNewPins = () => {
        let promises = [];
        let pinData = [];

        // let pins = ["ocean", "Tokyo", "dogs", "cats"]
        category.forEach((pinTerm) => {
            promises.push(
                getImages(pinTerm).then((res) => {
                    let results = res.data.results;
                    pinData = pinData.concat(results)
                    pinData.sort(function (a, b) {
                        return 0.5 - Math.random();
                    });
                })
            );
        });
        Promise.all(promises).then(() => {
            setNewPins(pinData);
        });
    };

    useEffect(() => {
        getNewPins();
    }, []);

    return (
        <div className="app">
            <Header onSubmit={onSearchSubmit} toggleAddImageModal={toggleAddImageModal}/>
            <br/>
            <FlexStyled gap={'24px'} justifyContent={'center'}>
                {category.map((item, index) => <CategoryItem category={item} activeKeys={activeCategory}
                                                             toggleCategory={toggleMenuCategory} key={index}/>)}
            </FlexStyled>
            <Mainboard pins={pins}/>
            <AddImageModal setVisible={toggleAddImageModal} visible={showAddImageModal}/>
        </div>
    );
}

export default App;
