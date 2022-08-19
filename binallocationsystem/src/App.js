import { TextField } from "@mui/material"
import './App.css';
import { useEffect, useState } from "react"
import axios from './util/apiClient'


function App() {
  const [skuInfo, setSkuInfo] = useState([])
  const [searchSku, setSearchSku] = useState("")
  const [searchBatch, setSearchBatch] = useState("")
  const [updateBin, setUpdateBin] = useState("")


  const contactApi = async () => {
    const getHello = await axios.get('/getSkuInfo')
    setSkuInfo(getHello.data.data.values)

  }
  const getExcelData = async () => {
    let check = false;
    let DataRow = 345345;
    const userKeyRegExp = /^[0-9]{2}\-[0-9]{3}\-[A-Z]$/;

    const valid = userKeyRegExp.test(updateBin);
    console.log(valid)
    skuInfo.forEach((element, index) => {
      if (element[0].toUpperCase() === searchSku.toUpperCase() && element[1].toUpperCase() === searchBatch.toUpperCase() && valid) {
        check = true;
        DataRow = index;
        return
      }
    })
    if (check) {

      const newData = [...skuInfo[DataRow]]
      newData[2] = updateBin
      await axios.post('/updateBin', {
        range: `Sheet1!A${DataRow + 1}:D${DataRow + 1}`,
        values: newData
      })
    }
  }


  useEffect(() => {
    getExcelData()
  }, [searchSku, searchBatch, updateBin])
  useEffect(() => {
    contactApi()
  }, [])

  return (
    <div className="App">
      <header className="App-header">
      </header>
      <TextField
        required
        id="outlined-required"
        label="Search"
        value={searchSku}
        onChange={(event) => setSearchSku(event.target.value)}
      />
      <TextField
        required
        id="outlined-required"
        label="Search"
        value={searchBatch}
        onChange={(event) => setSearchBatch(event.target.value)}
      />
      <TextField
        required
        id="outlined-required"
        label="Bin"
        value={updateBin}
        onChange={(event) => setUpdateBin(event.target.value)}
      />

      <div>{skuInfo.map(element => {
        if (element[0].toUpperCase().startsWith(searchSku.toUpperCase()) && element[1].toUpperCase().startsWith(searchBatch.toUpperCase()))
          return (
            <div>
              <div>Sku: {element[0]}</div>
              <div>Batch: {element[1]}</div>
              <div>Bin: {element[2]}</div>
            </div>
          )
      })}</div>
    </div>
  );
}

export default App;


