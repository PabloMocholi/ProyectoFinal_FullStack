import './index.css'

export const Albumes = () => {
    return (<>
        <div className='Albumes'>

            <div className='Album'>
                <div className='background-img'></div>
                <div className='Album-content'>
                    <img className='img' src="https://app.activate.fm/news/img/bad_gyal_nuevo_album_la_joia.jpg" alt="" />
                    <div className='Album-info'>
                        <h2>LA JOIA</h2>
                        <h4>Bad Gyal</h4>
                    </div>
                </div>
            </div>

            <div className='Album'>
                <div className='background-img-2'></div>
                <div className='Album-content'>
                    <img className='img' src="https://m.media-amazon.com/images/I/913-R1MWfTL._UF894,1000_QL80_.jpg" alt="" />
                    <div className='Album-info'>
                        <h2>Cuando No Sé Quién Soy</h2>
                        <h4>Amaia</h4>
                    </div>
                </div>
            </div>

        </div>

    </>)
}
export default Albumes