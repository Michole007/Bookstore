
const Contact = () => {
    return (
        <div className='contact'>
            <h1 style={{ textAlign: 'center' }}>SAY SOMETHING</h1>
            <form>
                <div className="name">
                    <input type="text" placeholder="Enter Your Name........." />
                </div>
                <div className='email'>
                    <input type="email" placeholder="Enter Your Email.........." />
                </div>
                <div className='number'>
                    <input type="tel" placeholder="Enter Your Number" />
                </div>
                <div className="message">
                    <textarea style={{ width: '100%' }} cols="30" rows="10" placeholder="Enter Your Message........."></textarea>
                </div>
                <div className="button">
                    <button type="button">send message</button>
                </div>
            </form>
        </div>
    )
}

export default Contact