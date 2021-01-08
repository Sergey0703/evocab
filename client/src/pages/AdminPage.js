import React, { useState,useContext } from "react";
import Papa from "papaparse";
import {useHttp} from '../hooks/http.hook'
import {AuthContext} from '../context/AuthContext'
//import _ from "lodash";

const Upload = () => {
    const auth = useContext(AuthContext)
    const {request} = useHttp()
  const [state, setState] = useState({
    csvfile: null,
    tShirts: [null],
    felpe: [null]
  });

  function handleChange(event) {
    setState({
      csvfile: event.target.files[0]
    });
  }

  function importCSV(e) {
    e.preventDefault();
    const { csvfile } = state;

    csvfile &&
      Papa.parse(csvfile, {
        header: false,
        dynamicTyping: true,
        complete: updateData
      });
  }

 async function updateData(result) {
    setState({
      csvfile: null
    });
    var data = result.data;
    console.log(data);
    try {
    const mydata = await request('/api/vocab/importcsv', 'POST', {from: data}, {
        Authorization: `Bearer ${auth.token}`
      })
    } catch (e) {}
    /*
    var tshirts = _.map(data, function(o) {
      if (_.includes(o.stampa, "T-Shirt")) return o;
    });
    tshirts = _.without(tshirts, undefined);

    var felpe = _.map(data, function(obj) {
      if (_.includes(obj.stampa, "Felpa")) return obj;
    });

    felpe = _.without(felpe, undefined);

    setState({ tShirts: tshirts, felpe: felpe });
    */
  }

  return (
    <div>
      <div className="upload">
        <p>Carica gli ordini</p>
        <input
          className="upload-input"
          type="file"
          name="file"
          placeholder={null}
          onChange={handleChange}
        />
        <p />
        <button onClick={importCSV}>Upload</button>
      </div>
    </div>
  );
};

export default Upload;