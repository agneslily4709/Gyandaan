import React from 'react';
import {Carousel} from 'react-bootstrap';
import one from '../Assets/Imge/12.jpg';
import two from '../Assets/Imge/1a.jpg';
import three from '../Assets/Imge/13.jpg';
import four from '../Assets/Imge/14.jpg';
import five from '../Assets/Imge/15.jpg';
import six from '../Assets/Imge/16.jpg';
import seven from '../Assets/Imge/17.jpg';
import eight from '../Assets/Imge/18.jpg';
import nine from '../Assets/Imge/19.jpg';
import ten from '../Assets/Imge/20.jpg';

const Slideshow = () => {
  return (
    <div className='container-fluid'>
    <div className='row'>
    <div className='slider col-12'>
      <Carousel>
        <Carousel.Item>
          <img className="my-slideshow-img" src={one} alt="First slide"/>
        </Carousel.Item>
        <Carousel.Item>
          <img className="my-slideshow-img" src={two} alt="second slide"/>
        </Carousel.Item>
        <Carousel.Item>
          <img className="my-slideshow-img" src={three} alt="third slide"/>
        </Carousel.Item>
        <Carousel.Item>
         <img className="my-slideshow-img" src={four} alt="four slide"/>
        </Carousel.Item>
        <Carousel.Item>
          <img className="my-slideshow-img" src={five} alt="five slide"/>
        </Carousel.Item>
        <Carousel.Item>
           <img className="my-slideshow-img" src={six} alt="six slide"/>
        </Carousel.Item>
        <Carousel.Item>
          <img className="my-slideshow-img" src={seven} alt="seven slide"/>
        </Carousel.Item>
        <Carousel.Item>
          <img className="my-slideshow-img" src={eight} alt="eight slide"/>
        </Carousel.Item>
        <Carousel.Item>
          <img className="my-slideshow-img" src={nine} alt="nine slide"/>
        </Carousel.Item>
        <Carousel.Item>
          <img className="my-slideshow-img" src={ten} alt="ten slide"/>
        </Carousel.Item>
      </Carousel>
      </div>
      </div>
  </div>
  )
};

export default Slideshow;
