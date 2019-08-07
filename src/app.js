import React from "react";
import { connect } from "react-redux";

const rc = function (props) {
  return <div>
    <p>
      {JSON.stringify(props.saveData || null)}
    </p>
    <button onClick={() => console.log('click')}>click me</button>
  </div>
}

function mapStateToProps(state) {
  return { saveData: state.saveData }
}

export default connect(mapStateToProps)(rc)