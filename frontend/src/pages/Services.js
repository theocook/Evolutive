import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Services() {
    return (
        <>
            <Header />
            <main className="pt-20">
                <section className="container mx-auto px-6 py-12">
                    <h1 className="text-4xl font-semibold">Nos services</h1>
                    <p className="text-gray-700 max-w-3xl mt-4">Présentation de nos services.</p>
                </section>
            </main>
            <Footer />
        </>
    );
}