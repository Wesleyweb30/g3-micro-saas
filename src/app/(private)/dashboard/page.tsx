import { getProduttivoFormFillsManutencao } from "@/src/service/produttivo.service";

/*
========================================
Função para pegar valor de campo
========================================
*/
function getFieldValue(fields: any[], name: string) {
    const field = fields?.find(
        (f) => f.name?.trim() === name.trim()
    );

    return field?.value ?? "–";
}

/*
========================================
Formata data para pt-BR
========================================
*/
function formatDateBR(date: string) {
    if (!date) return "–";

    return new Date(date).toLocaleString("pt-BR", {
        timeZone: "America/Sao_Paulo",
    });
}

/*
========================================
Retorna nome do mês
========================================
*/
function getMonthName(date: Date) {
    return date.toLocaleString("pt-BR", {
        month: "long",
    });
}

/*
========================================
Intervalo do mês
========================================
*/
function getMonthRange(date: Date) {
    const year = date.getFullYear();
    const month = date.getMonth();

    const first = new Date(year, month, 1);
    const last = new Date(year, month + 1, 0);

    const pad = (n: number) => n.toString().padStart(2, "0");

    return {
        start: `${pad(first.getDate())}/${pad(month + 1)}/${year}`,
        end: `${pad(last.getDate())}/${pad(month + 1)}/${year}`,
    };
}

export default async function DashboardPage() {

    const now = new Date();

    const mesAtualDate = now;
    const mesAnteriorDate = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const mesAnterior2Date = new Date(now.getFullYear(), now.getMonth() - 2, 1);

    const mesAtual = getMonthRange(mesAtualDate);
    const mesAnterior = getMonthRange(mesAnteriorDate);
    const mesAnterior2 = getMonthRange(mesAnterior2Date);

    /*
    ================================
    Busca na API
    ================================
    */

    // Manutenções gerais (todos usuários)
    const manutencaoAtual = await getProduttivoFormFillsManutencao({
        startDate: mesAtual.start,
        endDate: mesAtual.end,
        // userId: 310344,
        formId: 356263,
    });


    const manutencaoAnterior = await getProduttivoFormFillsManutencao({
        startDate: mesAnterior.start,
        endDate: mesAnterior.end,
        // userId: 310344,
        formId: 356263,
    });

    const manutencaoAnterior2 = await getProduttivoFormFillsManutencao({
        startDate: mesAnterior2.start,
        endDate: mesAnterior2.end,
        // userId: 310344,
        formId: 356263,
    });

    const manutencaoAtualG3 = await getProduttivoFormFillsManutencao({
        startDate: mesAtual.start,
        endDate: mesAtual.end,
        userId: 310344,
        formId: 356263,
    });

    const totalAtual = manutencaoAtual?.meta?.count ?? 0;
    const totalAnterior = manutencaoAnterior?.meta?.count ?? 0;
    const totalAnterior2 = manutencaoAnterior2?.meta?.count ?? 0;

    // G3 manutenções (usuário específico)
    const manutencaoAnteriorG3 = await getProduttivoFormFillsManutencao({
        startDate: mesAnterior.start,
        endDate: mesAnterior.end,
        userId: 310344,
        formId: 356263,
    });

    const manutencaoAnterior2G3 = await getProduttivoFormFillsManutencao({
        startDate: mesAnterior2.start,
        endDate: mesAnterior2.end,
        userId: 310344,
        formId: 356263,
    });

    const totalAtualG3 = manutencaoAtualG3?.meta?.count ?? 0;
    const totalAnteriorG3 = manutencaoAnteriorG3?.meta?.count ?? 0;
    const totalAnterior2G3 = manutencaoAnterior2G3?.meta?.count ?? 0;

    return (
        <main className="p-10 space-y-8">
            <h1 className="text-4xl font-extrabold text-center text-gray-800">
                Dashboard de Manutenções
            </h1>

            <section className="space-y-6">
                <h2 className="text-2xl font-semibold text-gray-700">
                    Resumo dos Últimos Meses
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="bg-gradient-to-r from-green-400 to-green-600 text-white p-6 rounded-lg shadow-md">
                        <h3 className="text-lg font-medium">Mês Atual - {getMonthName(mesAtualDate)}</h3>
                        <p className="text-4xl font-bold">{totalAtual}</p>
                    </div>
                    <div className="bg-gradient-to-r from-blue-400 to-blue-600 text-white p-6 rounded-lg shadow-md">
                        <h3 className="text-lg font-medium">Mês Anterior - {getMonthName(mesAnteriorDate)}</h3>
                        <p className="text-4xl font-bold">{totalAnterior}</p>
                    </div>
                    <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-white p-6 rounded-lg shadow-md">
                        <h3 className="text-lg font-medium">{getMonthName(mesAnterior2Date)}</h3>
                        <p className="text-4xl font-bold">{totalAnterior2}</p>
                    </div>
                </div>
            </section>

            <section className="space-y-6">
                <h2 className="text-2xl font-semibold text-gray-700">
                    Resumo de Manutenções G3
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="bg-gradient-to-r from-green-400 to-green-600 text-white p-6 rounded-lg shadow-md">
                        <h3 className="text-lg font-medium">Mês Atual - {getMonthName(mesAtualDate)}</h3>
                        <p className="text-4xl font-bold">{totalAtualG3}</p>
                    </div>
                    <div className="bg-gradient-to-r from-blue-400 to-blue-600 text-white p-6 rounded-lg shadow-md">
                        <h3 className="text-lg font-medium">Mês Anterior - {getMonthName(mesAnteriorDate)}</h3>
                        <p className="text-4xl font-bold">{totalAnteriorG3}</p>
                    </div>
                    <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-white p-6 rounded-lg shadow-md">
                        <h3 className="text-lg font-medium">{getMonthName(mesAnterior2Date)}</h3>
                        <p className="text-4xl font-bold">{totalAnterior2G3}</p>
                    </div>
                </div>
            </section>

            <section className="space-y-6">
                <h2 className="text-2xl font-semibold text-gray-700">
                    Histórico de Manutenções Recentes
                </h2>
                <div className="overflow-x-auto">
                    <table className="min-w-full border border-gray-300 rounded-lg">
                        <thead className="bg-gray-200">
                            <tr>
                                <th className="p-4 text-left">OS</th>
                                <th className="p-4 text-left">Data</th>
                                <th className="p-4 text-left">Executor</th>
                                <th className="p-4 text-left">Fim do Serviço</th>
                                <th className="p-4 text-left">Mídia</th>
                                <th className="p-4 text-left">Serviços Executados</th>
                                <th className="p-4 text-left">Observação</th>
                            </tr>
                        </thead>
                        <tbody>
                            {manutencaoAtual?.results?.map((item: any) => (
                                <tr key={item.id} className="hover:bg-gray-100">
                                    <td className="p-4 border">{item.document_number}</td>
                                    <td className="p-4 border">{formatDateBR(item.created_at)}</td>
                                    <td className="p-4 border">{getFieldValue(item.field_values, "EXECUTOR DO SERVIÇO")}</td>
                                    <td className="p-4 border">{formatDateBR(getFieldValue(item.field_values, "DATA E HORA - FIM DE SERVIÇO"))}</td>
                                    <td className="p-4 border">{getFieldValue(item.field_values, "MIDIA")}</td>
                                    <td className="p-4 border">{getFieldValue(item.field_values, "SERVIÇO EXECUTADO")}</td>
                                    <td className="p-4 border">{getFieldValue(item.field_values, "OBSERVAÇÃO")}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>
        </main>
    );
}