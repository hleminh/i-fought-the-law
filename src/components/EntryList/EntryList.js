import React, { Component } from "react";
import Entry from "./Entry/Entry";

class EntryList extends Component {
  componentDidMount() {}

  componentWillReceiveProps(nextProps) {}

  render() {
    const entries = this.props.dataList.map(data => (
      <Entry
    
      />
    ));

    return <div className="EntryList">{entries}</div>;
  }
}

export default EntryList;
