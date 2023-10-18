import './Section.css';

const Section = ({sectionName, srcPath, sectionHeaders, sectionBody, background, videoFirst=false}) => {
    return (
        <section className={`${sectionName} ${background}`}>
                {videoFirst && <div className="section-illustration">
                    <video src={srcPath} autoPlay loop muted ></video>
                </div>}
                <div className="section-copy">
                    {sectionHeaders.map((secHeader, idx) => <h2 key={idx} className="section-header">{secHeader}</h2>)}
                    <p className="section-body">{sectionBody}</p>
                </div>
                {!videoFirst && <div className="section-illustration">
                    <video src={srcPath} autoPlay loop muted ></video>
                </div>}
        </section>
    )
}

export default Section;