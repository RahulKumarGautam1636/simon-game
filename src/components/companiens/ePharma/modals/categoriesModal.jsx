import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { filterAction, modalAction } from "../../../../actions";
import { escape } from "../utilities";

const CategoriesModal = ({ siteData, modalAction, filterData, filterAction }) => {

    const renderCategory = (data) => {
        
        return data.LinkCategoryList?.map((item, index) => {
            if (!item.Parent) return
            const subItemsList = data.LinkSubCategoryList.filter(i => item.Parent === i.Parent);
            return (
                <div className="categories-box position-relative" key={index}>
                    <div className="card mb-4">
                        <div className="card-header d-flex justify-content-between align-items-baseline">
                            <h5 className="mb-0">
                                <Link className={`category-title ${item.Parent === filterData.selectedCategoryId && 'active'}`} to={`/filters/?head=${escape(item.ParentDesc).swap}&catVal=${item.Parent}&page=1`} onClick={() => {filterAction('selectedCategoryId', item.Parent); modalAction('CATEGORY_MODAL', false)}}>
                                    {item.Parent === filterData.selectedCategoryId && <i className='bx bx-check-double' style={{fontSize: '3rem', lineHeight: '0', verticalAlign: 'sub'}}></i>} {item.ParentDesc}
                                </Link> 
                            </h5>
                            <Link style={{fontSize: '1.3rem', color: '#FF9800'}} to={`/filters/?head=${escape(item.ParentDesc).swap}&catVal=${item.Parent}&page=1`} onClick={() => {filterAction('selectedCategoryId', item.Parent); modalAction('CATEGORY_MODAL', false)}} className='mb-0'>View All</Link>
                        </div>
                        {subItemsList.length ? <div className="card-body p-0 cart">
                            <ul className="cat-style-one">
                                {subItemsList.map((subItem, n) => {
                                    return (
                                        <li key={n}>
                                            <div>
                                                <Link className={`nav-link tab-button ${subItem.CategoryId === filterData.selectedCategoryId && 'active'}`} onClick={() => {filterAction('selectedCategoryId', subItem.CategoryId); modalAction('CATEGORY_MODAL', false)}} to={`/filters/?head=${escape(item.ParentDesc).swap}&catVal=${item.Parent}&subHead=${escape(subItem.CategoryDesc).swap}&subCatVal=${subItem.CategoryId}&page=1`}>{subItem.CategoryDesc}</Link>
                                            </div>
                                        </li>
                                    )
                                })}
                                {subItemsList.length ? '' : <Link className={`nav-link tab-button d-inline-block opacity-0`} to={`#`}>No Items Found</Link>}
                            </ul>
                        </div> : ''}
                    </div>
                </div>
            )
        })
    }

    return (
        <div className="categories-modal h-100 p-3 p-lg-4 overflow-hidden bg-white">
            <i className='bx bx-x-circle close-custom-modal' onClick={() => modalAction('CATEGORY_MODAL', false)}></i>
            <h4 className="title ps-2">Categories</h4>
            <div className="h-100 overflow-auto p-2">
                {renderCategory(siteData)}
            </div>
        </div>
    )
}


const mapStateToCategoryModal = (state) => {
    return { siteData: state.siteData, filterData: state.filterData };
}

export default connect(mapStateToCategoryModal, {modalAction, filterAction})(CategoriesModal);