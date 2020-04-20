import React, { Component } from "react";
import MenuListItem from "../menu-list-item";
import { connect } from "react-redux";
import WithRestoService from "../hoc";
import { menuLoaded, menuRequested, menuError, addedToCart } from "../../actions";
import "./item-page.css";
import Spinner from "../spinner";
import Error from "../error";

class ItemPage  extends Component {
  componentDidMount() {
    this.props.menuRequested();

    const { RestoService } = this.props;
    RestoService.getMenuItems()
      .then((res) => this.props.menuLoaded(res))
      .catch((error) => this.props.menuError());
  }

  render() {
    const { menuItems, loading, error, addedToCart } = this.props;

    if (loading) {
      return <Spinner />;
    }
    if (error) {
      return <Error />;
    }

    console.log(this.props);

    const item = menuItems.find(el => +el.id === +this.props.match.params.id);
    const {title, price, url, category, id} = item;


    return (
        <li className="menu__item">

       
        <div className="menu__title">{title}</div>
        <img className="menu__img" src={url} alt="Cesar salad"></img>
        <div className="menu__category">Category: <span>{category}</span></div>
        <div className="menu__price">Price: <span>{price}$</span></div>
        <button onClick={()=>addedToCart(id)} className="menu__btn">Add to cart</button>
        <span className = {`menu__category_Img ${category}`}></span>
    </li>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    menuItems: state.menu,
    loading: state.loading,
    error: state.error,
  };
};

const mapDispatchToProps = {
  menuLoaded,
  menuRequested,
  menuError,
  addedToCart
};

export default WithRestoService()(
  connect(mapStateToProps, mapDispatchToProps)(ItemPage)
);
