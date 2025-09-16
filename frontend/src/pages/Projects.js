import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Projects() {
    return (
        <>
            <Header />
            <main className="pt-20">
                <section className="container mx-auto px-6 py-12">
                    <h1 className="text-4xl font-semibold">Projects</h1>
                    <p className="text-gray-700 max-w-3xl mt-4">
                        A selection of projects we have led and supported.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
                        <article className="p-6 bg-white rounded-2xl shadow">
                            <h2 className="text-2xl font-semibold">Project A</h2>
                            <p className="text-gray-600 mt-2">
                                Short description of project A with key outcomes.
                            </p>
                        </article>

                        <article className="p-6 bg-white rounded-2xl shadow">
                            <h2 className="text-2xl font-semibold">Project B</h2>
                            <p className="text-gray-600 mt-2">
                                Short description of project B with key outcomes.
                            </p>
                        </article>

                        <article className="p-6 bg-white rounded-2xl shadow">
                            <h2 className="text-2xl font-semibold">Project C</h2>
                            <p className="text-gray-600 mt-2">
                                Short description of project C with key outcomes.
                            </p>
                        </article>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
