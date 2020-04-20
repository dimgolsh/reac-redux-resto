const data = `{ 
    "menu": [ 
        {
            "title": "Cesar salad",
            "price": 12,
            "url": "https://static.1000.menu/img/content/21458/-salat-cezar-s-kr-salat-cezar-s-krevetkami-s-maionezom_1501173720_1_max.jpg",
            "category": "salads",
            "id": 1
          },
          {
            "title": "Pizza Margherita",
            "price": 10,
            "url": "https://www.pizzanapoletana.org/struttura/pagine_bicolor/mobile/decalogo_avpn_1.jpg",
            "category": "pizza",
            "id": 2
          },
          {
            "title": "Pizza Napoletana",
            "price": 13,
            "url": "https://www.pizzanapoletana.org/struttura/pagine_bicolor/mobile/decalogo_avpn_1.jpg",
            "category": "pizza",
            "id": 3
          },
          {
            "title": "Greece salad",
            "price": 8,
            "url": "https://assets.epicurious.com/photos/576454fb42e4a5ed66d1df6b/master/pass/greek-salad.jpg",
            "category": "salads",
            "id": 4
          },
          {
            "title": "Cowboy Steak",
            "price": 25,
            "url": "https://i.cbc.ca/1.4491288.1516208229!/fileImage/httpImage/image.jpg_gen/derivatives/16x9_780/cowboysteak.jpg",
            "category": "meat",
            "id": 5
          }
]}`;

export default class RestoService {
  constructor() {
    this._apiBase = "http://localhost:3000";
   // console.log(JSON.parse(data));
  }
  getResorce = async (url) => {
    const res = await fetch(`${this._apiBase}${url}`);
    if (!res.ok) {
      throw new Error(`Could not fey ${url} status ${res.status}`);
    }
    const some = await res.json();

    return some;
  };

  getMenuItems = async () => {
   // const res = await this.getResorce("/menu/");
  let json = JSON.parse(data);
   // console.log(json['menu']);
    return json['menu'];
  };
  async getItem(id) {
    const res = await this.getResource("/menu/");
    console.log(res);
    const item = res.find((el) => {
      console.log(`el.id: ${el.id}, id: ${id}`);
      return el.id === +id;
    });
    console.log(item);
    return item;
  }

  async setOrder(order) {
    const number = await this.getOrderNumber();
    const newOrder = {
      id: number,
      order: order,
    };
    const response = await fetch(`${this._apiBase}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(newOrder),
    });
    if (!response.ok) {
      throw new Error("json error");
    }
  }

  async getOrderNumber() {
    const res = await this.getResorce("/orders/");
    const orderNumber = res.length + 1;

    return orderNumber;
  }
}
