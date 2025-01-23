import { useEffect, useRef, useState } from "react";
import axios from "axios";
import Pagination from "../components/Pagination";
import ProductModal from "../components/ProductModal";
import DelProductModal from "../components/DelProductModal";




// const { VITE_BASE_URL, VITE_API_PATH } = import.meta.env;
const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;
// 綁定產品 Modal 狀態， Modal 狀態的預設值
const defaultModalState = {
  imageUrl: "",
  title: "",
  category: "",
  unit: "",
  origin_price: "",
  price: "",
  description: "",
  content: "",
  is_enabled: 0,
  imagesUrl: [""]
};

function ProductPage() {

    const [products, setProducts] = useState([]);
    const [tempProduct, setTempProduct] = useState(defaultModalState);
    const myModalRef = useRef(null);
    const delMyModalRef = useRef(null)

    // 新增 Modal 狀態：打開 Modal 後，變更狀態來修改標題和值
    const [modalMode, setModalMode] = useState(null)

    // 取得產品資料串接 GET API
    const getProducts = async (page = 1) => {
        try {
        const res = await axios.get(
            `${BASE_URL}/v2/api/${API_PATH}/admin/products?page=${page}`
        );
        setProducts(res.data.products);
        setPageInfo(res.data.pagination);
        } catch (error) {
        alert("取得產品失敗");
        }
    };

    useEffect(() => {
        getProducts();
    }, [])

    
    // 打開刪除產品 Modal
    const handleOpenDelProductModal = (product) => {
        setTempProduct(product)
        delMyModalRef.current.show();
    }
   
     // 打開產品 Modal
    const handleOpenProductModal = (mode, product) => {
        myModalRef.current.show();
        setModalMode(mode);

        switch (mode) {
        case 'create':
            setTempProduct(defaultModalState)
            break;
        case 'edit':
            setTempProduct(product)
            break;

        default:
            break;
        }
    }
    
    //新增狀態來儲存頁面資訊
    const [ pageInfo, setPageInfo ] = useState({})
    // 換頁功能（調整 getProducts 函式）
    const handlePageChange = (page) => {
        getProducts(page)
    }

    return (
        <>
            <div className="container py-5">
            <div className="row">
                <div className="col">
                <div className="d-flex justify-content-between">
                <h2>產品列表</h2>
                <button type="button" onClick={() => {
                    handleOpenProductModal('create')
                }} className="btn btn-primary fw-bold">建立新的產品</button>
                </div>
                <table className="table">
                    <thead>
                    <tr>
                        <th scope="col">產品名稱</th>
                        <th scope="col">原價</th>
                        <th scope="col">售價</th>
                        <th scope="col">是否啟用</th>
                        <th scope="col"></th>
                    </tr>
                    </thead>
                    <tbody>
                    {products.map((product) => (
                        <tr key={product.id}>
                        <th scope="row">{product.title}</th>
                        <td>{product.origin_price}</td>
                        <td>{product.price}</td>
                        <td>{product.is_enabled ? (<span className="text-success fw-bold">啟用</span>) : (<span className="fw-bold">未啟用</span>)
                        }
                        </td>
                        <td>
                        <div className="btn-group">
                        <button type="button" onClick={() => {
                            handleOpenProductModal('edit', product)
                        }} className="btn btn-outline-primary btn-sm fw-bold">編輯</button>
                        <button onClick={() => {handleOpenDelProductModal(product)}} type="button" className="btn btn-outline-danger btn-sm fw-bold">刪除</button>
                        </div>
                        </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                </div>
            </div>
            <Pagination pageInfo={pageInfo} handlePageChange={handlePageChange} />
            </div>

            <ProductModal modalMode={modalMode} myModalRef={myModalRef} tempProduct={tempProduct} getProducts={getProducts} />
            <DelProductModal delMyModalRef={delMyModalRef} tempProduct={tempProduct} getProducts={getProducts} />
        </>
      )
}

export default ProductPage