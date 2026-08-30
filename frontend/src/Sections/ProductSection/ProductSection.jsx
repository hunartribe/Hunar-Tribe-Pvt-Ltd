import React, { useEffect, useState } from "react";
import { listCategoryImages } from "../../Utility/ImageFetch";

import Button from "../../Components/Button/Button";
import ProductCard from "./Components/ProductCard";
import ProductDropdown from "./Components/ProductDropdown";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import { useSection, useSiteSettings } from "../../cms/SiteContent";
import { categoryIcon } from "../../cms/icons";

const CARDS_SHOWN = 4;

const ProductSection = () => {
  const products = useSection("categories");
  const settings = useSiteSettings();

  const categories = products.items;

  const [images, setImages] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [loading, setLoading] = useState(false);

  const category = categories.find((cat) => cat.name === selectedCategory);

  // Land on a different collection each visit, once categories are known.
  useEffect(() => {
    if (categories.length === 0) return;
    setSelectedCategory((prev) => {
      if (prev && categories.some((cat) => cat.name === prev)) return prev;
      return categories[Math.floor(Math.random() * categories.length)].name;
    });
  }, [categories]);

  useEffect(() => {
    if (!category) return;
    let active = true;

    const load = async () => {
      setLoading(true);
      setImages([]);
      try {
        const files = await listCategoryImages(category.folder);
        if (!active) return;
        setImages(
          [...files].sort(() => 0.5 - Math.random()).slice(0, CARDS_SHOWN)
        );
      } catch (err) {
        console.error("Error fetching images", err);
      } finally {
        if (active) setLoading(false);
      }
    };

    load();
    return () => {
      active = false;
    };
  }, [category?.folder]);

  // Per-image title/price/badge an admin has set for this collection.
  const metaFor = (fileName) =>
    (category?.products || []).find((entry) => entry.file === fileName) || {};

  return (
    <>
      <section
        id="products"
        className="product flex flex-col justify-between gap-8 items-center md:px-[8%] lg:px-[10%] px-[16px] w-full mt-10 mb-10"
      >
        <div className="text flex flex-col md:flex-row justify-between items-start md:items-end w-full gap-2">
          <h1 className="text-[36px] lg:text-[48px] tracking-tighter text-textprimary font-medium leading-[120%]">
            {products.headingLead}&nbsp;
            <br />
            <span className="font-bold text-accent1">
              {products.headingHighlight}
            </span>
          </h1>
          <div className="buttonrow flex self-center justify-center items-center gap-4">
            <ProductDropdown
              categories={categories}
              selected={selectedCategory}
              setSelected={setSelectedCategory}
            />
            <Button
              link={settings.shopUrl}
              primary
              title={products.browseAllLabel}
            ></Button>
          </div>
        </div>

        <div className="banner flex justify-baseline items-baseline gap-4">
          <div className="icon w-12 h-12 bg-accent3 rounded-full flex justify-center items-center">
            {categoryIcon(category?.iconKey)}
          </div>
          <p className="title text-accent2 font-medium text-[20px] tracking-tight">
            {selectedCategory}
          </p>
        </div>

        <div className="productcardsection grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 w-full h-fit gap-4">
          {loading
            ? Array(CARDS_SHOWN)
                .fill(0)
                .map((_, index) => (
                  <div key={index} className="p-2">
                    <Skeleton height={300} borderRadius={12} />
                    <Skeleton height={20} className="mt-2" />
                    <Skeleton height={20} width="60%" />
                  </div>
                ))
            : images.map((image) => {
                const meta = metaFor(image.name);
                return (
                  <ProductCard
                    key={image.fullPath}
                    img={image.url}
                    title={meta.title}
                    price={meta.price}
                    badge={meta.badge}
                    categoryName={selectedCategory}
                    shopUrl={meta.url || category?.shopUrl || settings.shopUrl}
                  />
                );
              })}
        </div>
      </section>
    </>
  );
};

export default ProductSection;
