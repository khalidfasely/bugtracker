import photo from '../images/loader.gif';

const Loading = () => (
    <div className="loading-container">
        <img src={photo} alt='loading GIF' className="loading-img" />
    </div>
);

export default Loading;