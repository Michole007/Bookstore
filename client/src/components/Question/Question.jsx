import { Link } from "react-router-dom"

const Question = () => {
    return (
        <div className="question">
            <div className="question_text">
                <h1>have any question?</h1>
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quibusdam veritatis repudiandae ipsa enim temporibus eligendi obcaecati veniam nihil sint ratione labore.</p>
                <Link to=''>contact us</Link>
            </div>
        </div>
    )
}

export default Question