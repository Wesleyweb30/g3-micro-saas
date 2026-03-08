import Link from "next/link";

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
    return (
        <html lang="en">
            <body>
                <div className="flex flex-col lg:flex-row min-h-screen">
                    <aside className="w-full lg:w-64 bg-gradient-to-b from-gray-900 to-gray-700 text-white p-4">
                        <nav>
                            <ul className="space-y-4 text-center lg:text-left">
                                <li className="hover:underline cursor-pointer">🏠 <Link href="/dashboard"> Home</Link></li>

                                <li className="hover:underline cursor-pointer"> <Link href="/dashboard/manutencao">🛠️ Manutenções </Link></li>

                                <li className="hover:underline cursor-pointer">📊 Relatórios</li>

                                <li className="hover:underline cursor-pointer">⚙️ Configurações</li>
                            </ul>
                        </nav>
                    </aside>
                    <main className="flex-1 p-6 bg-gradient-to-b from-gray-100 to-gray-300">
                        <div className="max-w-7xl mx-auto">
                            {children}
                        </div>
                    </main>
                </div>
            </body>
        </html>
    );
}