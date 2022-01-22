import React, { useState, useEffect } from "react";
import axios from "axios";
import "./helper.css";
let datas = [];

export default function Helper() {
  const [dat, setDat] = useState([]);
  let imgPath = "http://3.238.89.147:5000/static/";
  useEffect(() => {
    const attri = async () => {
      const { data } = await axios.post(
        "http://3.238.89.147:5000/api/product/attribute/",
        {
          productID: "614d7297a9c0ba3aeec9e672",
        }
      );

      //   console.log(datas[0].attributes);
      setDat(data);
    };
    attri();
  }, []);

  const onClickAttribute = (value) => {
    let key = value.attributeName;
    let mapValue = value.mappingValue;
    let additionalPrice = value.additionalPrice;
    console.log(key);
    console.log(mapValue);
    console.log(additionalPrice);
  };

  const onChangeDropdown = (value) => {
    console.log(value);
    console.log(value.additionalPrice);
    console.log(value.mappingValue);
    console.log(value.attributeName);
  };
  const onColorClick = (value) => {
    console.log(value.additionalPrice);
    console.log(value.mappingValue);
    console.log(value.attributeName);
  };
  //   console.log(datas);
  console.log(dat);
  return (
    <div>
      fahim arif
      {dat.length > 0 &&
        dat.map((result, index) => (
          <>
            {result.attributes[0].mappingType === "image+text" && (
              <div>
                {result.attributes &&
                  result.attributes.map((value, idx) => (
                    <div key={idx}>
                      <ul
                        onClick={() => onClickAttribute(value)}
                        className='d-flex attribute_img_text_container'
                      >
                        <li className='pr-3'>
                          {value.mappingName}: {value.mappingLabel} [+${" "}
                          {value.additionalPrice}]
                        </li>
                        <img
                          src={imgPath + value.photoUrl}
                          alt=''
                          height={50}
                          width={50}
                        />
                      </ul>
                    </div>
                  ))}
              </div>
            )}

            {result.attributes[0].mappingType === "dropdown" && (
              <div className='d-flex attribute_img_text_container'>
                {result.attributes &&
                  result.attributes.map((value) => (
                    <div className='p-2'>
                      <label>
                        {" "}
                        {value.mappingName}: {value.mappingLabel} [+$
                        {value.additionalPrice}]
                      </label>
                      <input
                        classNam='p-2'
                        onClick={() => onChangeDropdown(value)}
                        type='radio'
                        id='html'
                        name='fav_language'
                        value='HTML'
                      ></input>
                    </div>
                  ))}
              </div>
            )}
            {result.attributes[0].mappingType === "color" && (
              <div className='d-flex attribute_img_text_container'>
                {result.attributes &&
                  result.attributes.map((value) => (
                    <li onClick={() => onColorClick(value)}>
                      {value.mappingName}: {value.mappingLabel} [+$
                      {value.additionalPrice}]
                    </li>
                  ))}
              </div>
            )}
          </>
        ))}
    </div>
  );
}
