import React, { useEffect, useState, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { getApiMethod, postApiMethod } from "../../Api";
import { useDispatch, useSelector } from "react-redux";
import { setIsPopup } from "../../redux/slices/User";
import { ToastContainer, toast } from "react-toastify";
import { HashLoader } from "react-spinners";

const Dishes = ({ open, setOpen }) => {
  const [dishes, setDishes] = useState([])
  const [backupDishData, setbackupDishData] = useState([])
  const [filterBarData, setfilterBarData] = useState([])
  const [activeCategory, setactiveCategory] = useState(0)
  const [isLoad, setisLoad] = useState(false)
  const [cartLoad, setcartLoad] = useState(false)
  const dispatch = useDispatch()
  let [product, setProduct] = useState([])
  const userId = useSelector((state) => state?.user?.userId);

  const init = async () => {
    const [{ data, status }, getCategory] = await Promise.all([
      getApiMethod("dish/getDishes"),
      getApiMethod("dish/categories"),
    ]);
    if (status == 200) {
      const addAllCategorySec = getCategory?.data

      addAllCategorySec?.unshift('All')
      setfilterBarData(addAllCategorySec)
      const addClickProperty = data?.map((item) => {
        return { ...item, isClicked: false }
      })
      setDishes(addClickProperty)
      setbackupDishData(addClickProperty)
    }
  }

  const getCartProducts = async () => {
    const [getCartItem] = await Promise.all([getApiMethod(`cart/getCartItemsById/${userId}`)]);
    let cartArray = getCartItem?.data;
    if (cartArray?.length > 0 && getCartItem?.status == 200) {
      // const dishArray = cartArray?.map(item => item.dish);
      const dishArray = []?.concat(...cartArray.map(item => item.dish));
      const makeProductArray = dishArray?.map((item) => {
        return {
          ...item, qty: item?.quantity, isOrdered: true, isClicked: true, actualPrice: item?.price, discription: item?.discription, image: item?.Image
        }
      })
      setProduct(makeProductArray)
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
  useEffect(() => {
    getCartProducts()
  }, [cartLoad])
  const addToCartItemFunc = (dish, index) => {
    const filteredArray = product?.filter(({ _id }) => _id == dish?._id);
    if (filteredArray?.length > 0) {
    } else {
      // Selected True
      const isClickedTrue = [...dishes]
      let currentObj = isClickedTrue[index]
      currentObj.isClicked = true
      isClickedTrue?.splice(index, 1, currentObj)
      setDishes(isClickedTrue)


      // Product Add
      setProduct((previous) => {
        const addQty = { ...dish, qty: 1, actualPrice: dish?.price, isOrdered: false }
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
  const placeOrder = async () => {
    if (!userId) {
      setOpen(!open)
      dispatch(setIsPopup(true))
    } else {
      const removeOrderedFood = product?.filter(({ isOrdered }) => {
        return isOrdered == false
      })
      setisLoad(true)
      const total = removeOrderedFood?.reduce((acc, { price }) => {
        return acc + price
      }, 0).toFixed(2)
      const makePostArray = removeOrderedFood?.map((item) => {
        return {
          Image: item?.image,
          quantity: item?.qty,
          price: item?.price, orderStatus: 'pending', name: item?.name, userId, discription: item?.discription
        }
      })
      if (makePostArray.length > 0) {
        const postOrderObj = { userId, dish: makePostArray, total }
        const { status, data } = await postApiMethod('cart/addToCart', postOrderObj)
        if (status == 200) {
          setisLoad(false)
          setcartLoad(!cartLoad)
          toast.success(`${data?.message}`, {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        } else {
          setisLoad(false)
        }
      }
      setisLoad(false)
    }
  }
  const removeItemsFromCart = (index) => {
    const filterProduct = [...product]
    filterProduct?.splice(index, 1)
    setProduct(filterProduct)
  }

  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        limit={1}
        hideProgressBar={false}
        newestOnTop
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={true}
        theme="light"
      />
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
              dishes?.map((dish, index) => {
                return <div className="p-2 lg:w-1/3" key={index}>
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
                        addToCartItemFunc(dish, index)
                      }}>
                        {dish?.isClicked ? 'Added' : 'Add to cart'}
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
                                        {
                                          product?.isOrdered ? <><button></button><button></button></> : <><button className="text-3xl bg-[#fff] text-[#000021] px-5 py-2 rounded-full hover:bg-[#fff]" onClick={() => {
                                            increaseQty(product, index)
                                          }}>
                                            +
                                          </button>
                                            <button className="text-3xl bg-[#fff] text-[#000021] px-5 py-2 rounded-full hover:bg-[#fff]" onClick={() => {
                                              decreaseQty(product, index)
                                            }}>
                                              -
                                            </button></>
                                        }

                                      </div>

                                      <div className="flex">
                                        {
                                          product?.isOrdered ? product?.orderStatus : <button
                                            onClick={() => { removeItemsFromCart(index) }}
                                            type="button"
                                            className="font-medium text-[#000021] hover:text-[#000021]"
                                          >
                                            Remove
                                          </button>
                                        }

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
                          <div
                            onClick={placeOrder}
                            className="cursor-pointer flex items-center justify-center border rounded-full border-transparent bg-[#161c4A] px-6 py-3 text-base font-medium text-white shadow-sm"
                          >
                            {isLoad ? <HashLoader color="#fff" size={20} /> : 'Place Order'}
                          </div>
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