
import { Link } from 'react-router-dom';
import { ConnectedProductCardM } from './cards';


export const SliderSectionM = ({ data, parentCategoryName, parentId }) => {
    
    return (
        <div className="mobile-product-section">
            <SliderHeading parentCategoryName={parentCategoryName} parentId={parentId}/>
            <SliderM data={data}/>
        </div>
    )
}


const SliderHeading = ({ parentCategoryName, parentId }) => (

    // <div className="cat-heading d-flex justify-content-between align-items-center">
    //     <p className='mb-0'>{parentCategoryName}</p>
    //     <Link to={`/filterPage/${parentCategoryName}~${parentId}`} className='mb-0'>VIEW ALL</Link>
    // </div>
    <div className='cat-heading'>
        <h4 className='mb-0'>{parentCategoryName}</h4>
        <span>View All</span>
    </div>
)

export const SliderM = ({ data }) => (

    <div className="mobile-product-slider">
        {data.map((item, index) => (
            <ConnectedProductCardM data={item} key={index}/>
        ))}
    </div>
)
