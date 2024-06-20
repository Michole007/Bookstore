import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { search_item } from "../../actions";
import Product from "../Products/Product";

const Search = () => {
    const navigate = useNavigate();
    const [search, set_search] = useState('');
    const dispatch = useDispatch();
    const products = useSelector((state) => state.productReducer.search_items);

    const search_for_an_item = () => {
        dispatch(search_item(search));

        set_search('');

        navigate(`/search?search=${search}`);
    }

    return (
        <div className="search_for_products">
            <div className="container" style={{ width: '80%', margin: '0 auto', padding: '50px 0' }}>
                <div style={{ display: "flex" }} >
                    <div className="input" style={{ flex: "1" }}>
                        <input type="search" value={search} onChange={(e) => set_search(e.target.value)} placeholder="search products................" />
                    </div>
                    <div className="search_button" style={{ flex: "0.2" }}>
                        <button onClick={search_for_an_item} style={{ cursor: "pointer" }} type="button">
                            search
                        </button>
                    </div>
                </div>
                <div className="display_search_items">
                    {products.length > 0
                    ?   <div className="display_products">
                            {products.map((product, index) => {
                                return <Product key={index} product={product} />
                            })}
                        </div>
                    : (
                        <h4>No searched item yet............</h4>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Search;