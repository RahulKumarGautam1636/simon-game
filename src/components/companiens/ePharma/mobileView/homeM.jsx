
import { Link } from 'react-router-dom';
import { ConnectedProductCardM } from './cards';
import { escape } from '../utilities';


export const SliderSectionM = ({ data, parentCategoryName, parentId }) => {
    
    return (
        <div className="mobile-product-section container">
            <SliderHeading parentCategoryName={parentCategoryName} parentId={parentId}/>
            <SliderM data={data}/>
        </div>
    )
}


const SliderHeading = ({ parentCategoryName, parentId }) => (

    <div className="cat-heading d-flex justify-content-between align-items-center my-0">
        <p className='mb-0'>{parentCategoryName}</p>
        <Link to={`/filters/?head=${escape(parentCategoryName).swap}&catVal=${parentId}`} className='mb-0'>VIEW ALL</Link>
    </div>
)

export const SliderM = ({ data }) => (

    <div className="mobile-product-slider">
        {data.map((item, index) => (
            <ConnectedProductCardM data={item} key={index}/>
        ))}
    </div>
)
