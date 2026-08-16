import React from 'react'

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
    const p = await params
    console.log(p)

    return (
        <main>
            <h1>Product Detail Page</h1>
            <p>Product Id: {p.id}</p>

        </main>
    )
}

export default Page
