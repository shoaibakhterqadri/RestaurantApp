import React, { useEffect, useRef } from "react";
import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { getApiMethod } from "../../Api";
import Slider from 'react-slick';

const Dishes = ({ open, setOpen }) => {
  const [dishes, setDishes] = useState([])
  const [backupDishData, setbackupDishData] = useState([])
  const [filterBarData, setfilterBarData] = useState([])
  const [activeCategory, setactiveCategory] = useState(0)
  let [product, setProduct] = useState([])

  const init = async () => {
    const [{ data, status }, getCategory] = await Promise.all([
      getApiMethod("dish/getDishes"),
      getApiMethod("dish/categories")
    ]);
    if (status == 200) {
      const addAllCategorySec = getCategory?.data
      addAllCategorySec?.unshift('All')
      setfilterBarData(addAllCategorySec)
      setDishes(data)
      setbackupDishData(data)
    }
  }

  const filterData = async (item) => {
    const dishArray = [...backupDishData]
    if (item == "All") {
      setDishes(dishArray)
    } else {
      const getFilteredDishesData = dishArray?.filter(({ category }) => {
        return category.toLowerCase() === item.toLowerCase();
      });
      setDishes(getFilteredDishesData)
    }

  }

  useEffect(() => {
    init()
  }, [])

  const addToCartItemFunc = (dish) => {
    const filteredArray = product?.filter(({ _id }) => _id == dish?._id);
    if (filteredArray?.length > 0) {
    } else {
      setProduct((previous) => {
        const addQty = { ...dish, qty: 1, actualPrice: dish?.price }
        const data = [...previous, addQty]
        return data
      })
    }
  }
  const increaseQty = (item, index) => {
    let { actualPrice, qty, price } = item
    const updateQtyAndPrice = { ...item, price: Number(price += actualPrice), qty: qty += 1 }
    const updateProduct = [...product]
    updateProduct?.splice(index, 1, updateQtyAndPrice)
    setProduct(updateProduct)
  }
  const decreaseQty = (item, index) => {
    let { actualPrice, qty, price } = item
    if (qty > 1) {
      const updateQtyAndPrice = { ...item, price: Number(price -= actualPrice), qty: qty -= 1 }
      const updateProduct = [...product]
      updateProduct?.splice(index, 1, updateQtyAndPrice)
      setProduct(updateProduct)
    }
  }

  return (
    <div>
      <section className="text-white body-font">
        <div className="container px-5 py-8 mx-auto w-[92%]">
          <div className="flex flex-wrap justify-center items-center gap2 mb-3">
            {
              filterBarData?.map((category, index) => {
                return <button
                  onClick={() => {
                    filterData(category)
                    setactiveCategory(index)
                  }}
                  type="button"
                  className={`menu-btn active-btn ${index == activeCategory ? 'text-white' : 'text-gray-400'}`}
                  id="featured"
                >
                  {category}
                </button>
              })
            }

          </div>



          <div className="flex flex-wrap -m-4 justify-center items-center">
            {
              dishes?.map((dish) => {
                return <div className="p-2 lg:w-1/3">
                  <div className="bg-[#161c4A] rounded-[30px] border-[4px] border-[#000235e8] py-[24px] px-[24px] cursor-grab shadow-xl">
                    <h1 className="text-3xl mb-6 font-extrabold font-[Poppins]">
                      {dish?.name}
                    </h1>
                    <p className="max-w-[300px] mb-3">
                      {dish?.discription}
                    </p>
                    <div className="mb-2">
                      <img
                        src={dish?.image?.url}
                        alt="pizza-fries"
                        className="h-[150px] w-[280px]"
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <button className="bg-[#fff] text-[#000021] px-5 py-2 rounded-full hover:bg-[#fff]" onClick={() => {
                        addToCartItemFunc(dish)
                      }}>
                        Add to cart
                      </button>
                      <div className="text-[24px] font-bold text-[#fff] font-[Poppins]">
                        {dish?.price}
                      </div>
                    </div>
                  </div>
                </div>
              })
            }


          </div>
        </div>
      </section>
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                <Transition.Child
                  as={Fragment}
                  enter="transform transition ease-in-out duration-500 sm:duration-700"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transform transition ease-in-out duration-500 sm:duration-700"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                    <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                      <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                        <div className="flex items-start justify-between">
                          <Dialog.Title className="text-lg font-medium text-gray-900">
                            Shopping cart
                          </Dialog.Title>
                          <div className="ml-3 flex h-7 items-center">
                            <button
                              type="button"
                              className="-m-2 p-2 text-gray-400 hover:text-gray-500"
                              onClick={() => setOpen(false)}
                            >
                              <span className="sr-only">Close panel</span>
                              <XMarkIcon
                                className="h-6 w-6"
                                aria-hidden="true"
                              />
                            </button>
                          </div>
                        </div>

                        <div className="mt-8">
                          <div className="flow-root">
                            <ul
                              role="list"
                              className="-my-6 divide-y divide-gray-200"
                            >
                              {product?.map((product, index) => (
                                <li key={product.id} className="flex py-6">
                                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                    <img
                                      src={product?.image?.url}
                                      alt={'dish-image'}
                                      className="h-full w-full object-cover object-center"
                                    />
                                  </div>

                                  <div className="ml-4 flex flex-1 flex-col">
                                    <div>
                                      <div className="flex justify-between text-base font-medium text-gray-900">
                                        <h3>
                                          <div>
                                            {product?.name}
                                          </div>
                                        </h3>
                                        <p className="ml-4">{product?.price}</p>
                                      </div>
                                      <p className="mt-1 text-sm text-gray-500">
                                        {product?.discription}
                                      </p>
                                    </div>
                                    <div className="flex flex-1 items-center justify-between text-md">
                                      <p className="text-gray-500">
                                        Quantity {product?.qty}
                                      </p>
                                      <div className="flex items-center">
                                        <button className="text-3xl bg-[#fff] text-[#000021] px-5 py-2 rounded-full hover:bg-[#fff]" onClick={() => {
                                          increaseQty(product, index)
                                        }}>
                                          +
                                        </button>
                                        <button className="text-3xl bg-[#fff] text-[#000021] px-5 py-2 rounded-full hover:bg-[#fff]" onClick={() => {
                                          decreaseQty(product, index)
                                        }}>
                                          -
                                        </button>
                                      </div>

                                      <div className="flex">
                                        <button
                                          type="button"
                                          className="font-medium text-[#000021] hover:text-[#000021]"
                                        >
                                          Remove
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>

                      <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                        <div className="flex justify-between text-base font-medium text-gray-900">
                          <p>Subtotal</p>
                          <p>{
                            product?.reduce((acc, { price }) => {
                              return acc + price
                            }, 0).toFixed(2)
                          }
                          </p>
                        </div>
                        <p className="mt-0.5 text-sm text-gray-500">
                          Shipping and taxes calculated at checkout.
                        </p>
                        <div className="mt-6">
                          <a
                            href="#"
                            className="flex items-center justify-center border rounded-full border-transparent bg-[#161c4A] px-6 py-3 text-base font-medium text-white shadow-sm"
                          >
                            Checkout
                          </a>
                        </div>
                        <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                          <p>
                            or
                            <button
                              type="button"
                              className="font-medium text-indigo-600 hover:text-indigo-500"
                              onClick={() => setOpen(false)}
                            >
                              Continue Shopping
                              <span aria-hidden="true"> &rarr;</span>
                            </button>
                          </p>
                        </div>
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  );
};

export default Dishes;
