import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import "bootstrap/dist/css/bootstrap.min.css";
import "./customStyle.css";

export default class community extends Component {
  constructor(props) {
    super(props);
    this.state = {
      communities: [],
      communityPrices: []
    };
    this.getCommunities = this.getCommunities.bind(this);
  }

  componentDidMount() {
    this.getCommunities();
  }

  getCommunities = () => {
    Promise.all([
      fetch(
        "https://a18fda49-215e-47d1-9dc6-c6136a04a33a.mock.pstmn.io/communities"
      ),
      fetch("https://a18fda49-215e-47d1-9dc6-c6136a04a33a.mock.pstmn.io/homes")
    ])
      .then(([res1, res2]) => Promise.all([res1.json(), res2.json()]))
      .then(([data1, data2]) =>
        this.setState({
          communities: data1,
          communityPrices: data2
        })
      );
  };

  render() {
    
    //first filter all price associated to community and find average
    const house = this.state.communityPrices;
    const summedPrice = house.reduce((a, c) => {
      let filtered = a.filter(el => el.communityId === c.communityId);
      if (filtered.length > 0) {
        a[a.indexOf(filtered[0])].price += +c.price / house.length;
      } else {
        a.push(c);
      }
      return a;
    }, []);
    const filterPrices = [...summedPrice];
    //console.log(filterPrices);

    // add all require data from two endpoint in to new array
    const communitienames = this.state.communities;
    let filtered = [];

    filterPrices.filter(function(newData) {
      return communitienames.filter(function(oldData) {
        if (newData.communityId === oldData.id) {
          return filtered.push({
            id: newData.id,
            name: oldData.name,
            imgUrl: oldData.imgUrl,
            price: newData.price
          });
        }
      });
    });

    // sort array by community name
    filtered.sort(function(a, b) {
      var nameA = a.name.toUpperCase(); // ignore upper and lowercase
      var nameB = b.name.toUpperCase(); // ignore upper and lowercase
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }

      // names must be equal
      return 0;
    });
    //console.log(filtered);

    const finalRecords = [...filtered];
    //console.log(finalRecords);

    return (
      <React.Fragment>
        <div className="maniList">
          {finalRecords.map(finalRecord => (
            <Card
              key={finalRecord.id}
              style={{ margin: "20px" }}
            >
              <Card.Img
                variant="top"
                src={finalRecord.imgUrl}
                alt="Community Image"
              />
              <Card.Body>
                <Card.Title>Community: {finalRecord.name} </Card.Title>
                <Card.Subtitle>
                  Average Price: ${Math.round(finalRecord.price)}{" "}
                </Card.Subtitle>
              </Card.Body>
            </Card>
          ))}
        </div>
      </React.Fragment>
    );
  }
}