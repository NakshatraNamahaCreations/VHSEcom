import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { ProductData } from "./data";
export default function PrductView() {
  const location = useLocation();
  let dataid = location?.state || null;
  const [isHovered, setIsHovered] = useState(false);
  const [HoveredIamge, setHoveredImage] = useState(
    "https://rukminim2.flixcart.com/image/832/832/xif0q/mobile/9/e/e/-original-imaghx9q5rvcdghy.jpeg?q=70&crop=false"
  );
  const handleImageView = (index) => {
    const hoveredImage = ProductData?.find((ele) => {
      if (Array.isArray(ele?.ProductImage)) {
        return ele.ProductImage[index] !== undefined;
      } else {
        return typeof ele.ProductImage === "string" && index === 0;
      }
    })?.ProductImage[index];

    if (hoveredImage !== undefined) {
      setHoveredImage(hoveredImage);
    }
  };

  return (
    <>
      <div className="row">
        {ProductData?.filter((item) => item?.id === dataid?.id)?.map((ele) => (
          <div key={ele.id} className="row">
            <div className="col-md-6">
              <div className="row">
                <div className="col-md-2">
                  {ele?.ProductImage?.map((img, index) => (
                    <div className="row">
                      <img
                        className="mt-3 imgview"
                        onMouseEnter={() => handleImageView(index)}
                        width={30}
                        height={50}
                        src={img}
                      />
                    </div>
                  ))}
                </div>
                <div className="col-md-8">
                  <img
                    className={`mt-3 ${isHovered ? "zoomed" : ""}`}
                    style={{ width: "100%", height: "400px" }}
                    src={HoveredIamge}
                  />
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <p className="headeingName">Category: {ele["Category Name"]}</p>
              <p className="headeingName">{ele.titel}</p>
              <p className="prices">
                <span className="Price m-auto">₹{ele.Price}</span>{" "}
                <p className="offe m-auto">{ele.offer} off</p>
              </p>

              <p>
                <span className="instc ">In Stock</span> QUANTITY : {ele.stock}
              </p>
              <p>About this item</p>
              <ul>
                {ele.description.map((dec) => (
                  <li> {dec}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
