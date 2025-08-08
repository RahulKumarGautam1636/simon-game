import React, { useCallback } from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';

// This page a posssible solution to unwanted rerendering of Carousel or any component with local state update.
// Make sure the data passed to this component also does not get recalculated with local state update. if so to prevent this
// just use useCallback or useMemo on it so it won't get recalculated with local state update. after this can pass data to this component.
// See an example performed with tabList variable on footer page.

const RenderCarousel = ({ data, responsive, autoPlay=false, stopAutoPlayOnHover=false, infinite=false, autoPlayInterval=false}) => {   // This shows difference b/w useMemo & useCallback. here we used both on same component to simulate differences.

    // const carousel = useMemo(() => {                 // useMemo takes a function and list of dependencies to rerender only if one of dependecies is changed.
    //     return (                                     // useMemo returns a value unlike the useCallback which returns a function. This is why we finally
    //         <AliceCarousel                           // returning carousel as value on line 23.
    //             mouseTracking
    //             items={data}
    //             responsive={responsive}
    //             autoPlay={autoPlay}
    //             stopAutoPlayOnHover={stopAutoPlayOnHover}
    //             infinite={infinite}
    //             autoPlayInterval={autoPlayInterval}
    //             disableDotsControls
    //             renderPrevButton={() => <div className="btn-prev">&lang;</div>}
    //             renderNextButton={() => <div className="btn-prev">&rang;</div>}
    //         />
    //     )
    
    // }, [data])  

    // return carousel;

    const carousel = useCallback(() => {          // useCallback takes a function and list of dependencies to rerender only if one of dependecies is changed.
        return (                                  // useMemo returns a function unlike the useMemo which returns a value. This is why we finally
            <AliceCarousel                        // returning carousel as function on line 48.
                mouseTracking
                items={data}
                responsive={responsive}
                autoPlay={autoPlay}
                stopAutoPlayOnHover={stopAutoPlayOnHover}
                infinite={infinite}
                autoPlayInterval={autoPlayInterval}
                disableDotsControls
                renderPrevButton={() => <div className="btn-prev">&lang;</div>}
                renderNextButton={() => <div className="btn-prev">&rang;</div>}
            />
        )

    }, [data])
    
    return carousel();
}

export default RenderCarousel;