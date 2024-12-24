import React from 'react'
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <div className='mt-3 border'>
        <footer className="bg-gradient-to-r from-gray-900 via-gray-800 to-black text-white py-8">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="flex flex-col items-center">
                        <h2 className="text-2xl font-bold mb-4">About Us</h2>
                        <p className="text-center">We are a leading e-commerce platform providing a wide range of products to cater to all your needs. Our mission is to deliver quality products at the best prices.</p>
                    </div>
                    <div className="flex flex-col items-center">
                        <h2 className="text-2xl font-bold mb-4">Quick Links</h2>
                        <ul className="text-center">
                            <li className="mb-2"><Link to="/" className="hover:underline">Home</Link></li>
                            <li className="mb-2"><Link to="/contact" className="hover:underline">Contact Us</Link></li>
                            <li className="mb-2"><Link to="/profile/cart" className="hover:underline">Cart</Link></li>
                            <li className="mb-2"><Link to="/login" className="hover:underline">Login</Link></li>
                            <li className="mb-2"><Link to="/register" className="hover:underline">Register</Link></li>
                        </ul>
                    </div>
                    <div className="flex flex-col items-center">
                        <h2 className="text-2xl font-bold mb-4">Follow Us</h2>
                       

                        <div className="flex space-x-4">
                            <a target='_blank' href="https://facebook.com" className="hover:text-gray-300"><FaFacebookF /></a>
                            <a target='_blank' href="https://twitter.com" className="hover:text-gray-300"><FaTwitter /></a>
                            <a target='_blank' href="https://instagram.com" className="hover:text-gray-300"><FaInstagram /></a>
                            <a target='_blank' href="https://linkedin.com" className="hover:text-gray-300"><FaLinkedinIn /></a>
                        </div>
                    </div>
                </div>
                <div className="mt-8 text-center">
                    <p>&copy; 2024 prayag agravat. All rights reserved.</p>
                </div>
            </div>
        </footer>
        </div>
    )
}

export default Footer