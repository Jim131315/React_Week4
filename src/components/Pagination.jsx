function Pagination ({ pageInfo, handlePageChange }) {
    return (
        <div className="d-flex justify-content-center">
            <nav>
                <ul className="pagination">
                    {/* 撰寫頁面顯示邏輯 */}
                    <li className={`page-item ${!pageInfo.has_pre && 'disabled'}`}>
                        <a className="page-link" onClick={(e) => {
                            handlePageChange(pageInfo.current_page - 1);
                            e.preventDefault(); 
                            }} href="#">
                            上一頁
                        </a>
                    </li>
                    {/* 根據頁面資訊渲染對應頁碼 */}
                    { Array.from({ length: pageInfo.total_pages }).map((_, index) => {
                        return (
                            <li key={index} className={`page-item ${pageInfo.current_page === index + 1 && 'active'}`}>
                            {/* 換頁功能（調整 getProducts 函式） */}
                            <a className="page-link" onClick={(e) => {
                            handlePageChange(index + 1);
                            e.preventDefault();  
                            }} href="#">
                            {index + 1}
                            </a>
                            </li> 
                        )
                    })}
                    <li className={`page-item ${!pageInfo.has_next && 'disabled'}`}>
                        <a className="page-link" onClick={(e) => {
                            handlePageChange(pageInfo.current_page + 1);
                            e.preventDefault(); 
                            }} href="#">
                            下一頁
                        </a>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default Pagination