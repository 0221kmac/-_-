import { useEffect, useState } from "react";
import useCustomLogin from "../../hooks/useCustomLogin";
import useCustomCart from "../../hooks/useCustomCart";
import CartItemComponent from "./CartItemComponent";
import PaymentComponent from "../payment/PaymentComponent";

const CartComponent = () => {
  const { isLogin, loginState } = useCustomLogin();
  const { refreshCart, cartItems, changeCart } = useCustomCart();
  const [checkList, setCheckList] = useState([]); // 체크 여부
  const [selectedQty, setSelectedQty] = useState(0); // 선택 물품 수량
  const [selectedPrice, setSelectedPrice] = useState(0); // 선택 물품 총 금액

  // 개별 체크박스 핸들러
  const changeSingleBox = (checked, id) => {
    if (checked) {
      setCheckList([...checkList, id]);
      console.log("check on - " + checkList);
    } else {
      setCheckList(checkList.filter((el) => el !== id));
      console.log("check off - " + checkList);
    }
  };

  // 전체 체크박스 핸들러
  const changeAllBox = (checked) => {
    if (checked) {
      const allCheckBox = [];
      cartItems.forEach((item) => allCheckBox.push(item.cino));
      setCheckList(allCheckBox);
    } else {
      setCheckList([]);
    }
  };

  // 주문완료 후 장바구니 비우기
  const clearCart = () => {
    cartItems.forEach((item) => {
      if (checkList.includes(item.cino)) {
        return changeCart({
          email: loginState.email,
          cino: item.cino,
          pno: item.pno,
          qty: 0,
        });
      }
      return item;
    });
  };

  useEffect(() => {
    if (isLogin) {
      refreshCart();
    }
  }, [isLogin]);

  useEffect(() => {
    if (!Array.isArray(cartItems)) {
      return; // cartItems가 배열이 아니면 처리 중단
    }

    // 선택된 장바구니 항목의 총 개수
    const selectedQty = cartItems.reduce((acc, curr) => {
      if (checkList.includes(curr.cino)) {
        return acc + curr.qty;
      } else {
        return acc;
      }
    }, 0);

    // 선택된 장바구니 항목의 총 금액
    const selectedPrice = cartItems.reduce((acc, curr) => {
      if (checkList.includes(curr.cino)) {
        return acc + curr.price * curr.qty;
      } else {
        return acc;
      }
    }, 0);

    setSelectedQty(selectedQty);
    setSelectedPrice(selectedPrice);
  }, [cartItems, checkList]);

  return (
    <div className="w-full">
      {isLogin ? (
        <div className="flex flex-col">
          <div className="w-full flex justify-end">
            <div className="bg-green-800 text-center text-white font-bold w-1/6 rounded-full py-1">
              상품 종류: {cartItems.length}개
            </div>
          </div>

          <div className="mt-8 border-y py-3 border-gray-300">
            <ul className="flex justify-evenly text-base text-center">
              <li className="w-1/12">
                {/* 전체 체크박스 */}
                <input
                  type="checkbox"
                  className="w-4 h-4 accent-green-700"
                  onChange={(event) => changeAllBox(event.target.checked)}
                  checked={checkList.length === cartItems.length ? true : false}
                />
              </li>
              <li className="w-2/12">이미지</li>
              <li className="w-2/12">상품명</li>
              <li className="w-2/12">판매가</li>
              <li className="w-2/12">수량</li>
              <li className="w-2/12">주문금액</li>
              <li className="w-1/12">삭제</li>
            </ul>
          </div>

          <div>
            <ul>
              {cartItems.map((item) => (
                <CartItemComponent
                  {...item}
                  key={item.cino}
                  changeCart={changeCart}
                  email={loginState.email}
                  changeSingleBox={changeSingleBox}
                  checkList={checkList}
                />
              ))}
            </ul>
          </div>

          {/* 전체 수량과 전체 금액 표시 */}
          <div className="flex justify-between border-b border-gray-300">
            <div className="flex w-1/12 justify-center items-center">
              <button
                onClick={clearCart}
                className="h-1/2 bg-green-700 hover:bg-green-900 text-white text-xs font-bold px-2 rounded"
              >
                선택 삭제
              </button>
            </div>
            <div
              className="flex justify-between items-center my-4"
              style={{ display: "flex", justifyContent: "flex-end" }}
            >
              <div style={{ marginRight: "30px", fontSize: "18px" }}>
                총 수량 : {selectedQty.toLocaleString("ko-KR")}개
              </div>
              <div style={{ marginRight: "30px", fontSize: "18px" }}>
                총 결제금액 : {selectedPrice.toLocaleString("ko-KR")}원
              </div>
            </div>
          </div>
          <PaymentComponent totalPrice={selectedPrice} clearCart={clearCart} />
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default CartComponent;
