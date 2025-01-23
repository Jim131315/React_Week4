import { useEffect, useRef } from "react";
import { Modal } from "bootstrap";
import axios from "axios";


// const { VITE_BASE_URL, VITE_API_PATH } = import.meta.env;
const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;


function delProductModal({ getProducts, tempProduct, delMyModalRef }) {
    const delProductModalRef = useRef(null)
    
    
    // 建立 Modal 實例
    useEffect(() => {
        delMyModalRef.current = new Modal(delProductModalRef.current,  {
        backdrop: false
        })
    }, [])
    
     // 確認邏輯
    const handleDeleteProduct = async () => {~
        try {
        await deleteProduct()
        getProducts()
        handleCloseDelProductModal()
        } catch (error) {
        alert('刪除產品失敗')
        }
    }

    
    // 刪除產品資料串接 DELETE API
    const deleteProduct = async () => {
        try {
            await axios.delete(`${BASE_URL}/v2/api/${API_PATH}/admin/product/${tempProduct.id}`)
        } catch (error) {
            alert('刪除產品失敗')
        }
        }

    // 關閉刪除產品 Modal
    const handleCloseDelProductModal = () => {
        delMyModalRef.current.hide();
    }    

    


    return (<>
        {/* 刪除產品 Modal */}
        <div ref={delProductModalRef}
        className="modal fade"
        id="delProductModal"
        tabIndex="-1"
        style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
            <div className="modal-dialog">
                <div className="modal-content">
                <div className="modal-header">
                    <h1 className="modal-title fs-5">刪除產品</h1>
                    <button
                    onClick={handleCloseDelProductModal}
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                    ></button>
                </div>
                <div className="modal-body">
                    你是否要刪除 
                    <span className="text-danger fw-bold">{tempProduct.title}</span>
                </div>
                <div className="modal-footer">
                    <button
                    onClick={handleCloseDelProductModal}
                    type="button"
                    className="btn btn-secondary"
                    >
                    取消
                    </button>
                    <button onClick={handleDeleteProduct} type="button" className="btn btn-danger">
                    刪除
                    </button>
                </div>
                </div>
            </div>
        </div>
    </>)
}

export default delProductModal