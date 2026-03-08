import { produttivoGet } from "@/src/service/produttivo.service";

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

    const manutencaoAtual = await produttivoGet('form_fills', {
        startDate: mesAtual.start,
        endDate: mesAtual.end,
        // userId: 310344,
        formId: 356263,
    });
    

    const manutencaoAnterior = await produttivoGet('form_fills',{
        startDate: mesAnterior.start,
        endDate: mesAnterior.end,
        // userId: 310344,
        formId: 356263,
    });

    const manutencaoAnterior2 = await produttivoGet('form_fills', {
        startDate: mesAnterior2.start,
        endDate: mesAnterior2.end,
        // userId: 310344,
        formId: 356263,
    });

    const manutencaoAtualG3 = await produttivoGet('form_fills', {
        startDate: mesAtual.start,
        endDate: mesAtual.end,
        userId: 310344,
        formId: 356263,
    });

    const manutencaoAnteriorG3 = await produttivoGet('form_fills', {
        startDate: mesAnterior.start,
        endDate: mesAnterior.end,
        userId: 310344,
        formId: 356263,
    });

    const manutencaoAnterior2G3 = await produttivoGet('form_fills', {
        startDate: mesAnterior2.start,
        endDate: mesAnterior2.end,
        userId: 310344,
        formId: 356263,
    });


    const totalAtual = manutencaoAtual?.meta?.count ?? 0;
    const totalAnterior = manutencaoAnterior?.meta?.count ?? 0;
    const totalAnterior2 = manutencaoAnterior2?.meta?.count ?? 0;

    const totalAtualG3 = manutencaoAtualG3?.meta?.count ?? 0;
    const totalAnteriorG3 = manutencaoAnteriorG3?.meta?.count ?? 0;
    const totalAnterior2G3 = manutencaoAnterior2G3?.meta?.count ?? 0;

    return (
        <main className="p-10 space-y-8">

            {/* ===============================
        TÍTULO
    =============================== */}
            <h1 className="text-3xl font-bold">
                Dashboard De Manutenções
            </h1>


            {/* ===============================
        RESUMO DOS 3 MESES
    =============================== */}
            <h1 className="text-xl font-semibold">
                Analise Resumido Geral
            </h1>

            <div className="grid grid-cols-6 gap-4">
                <div className="bg-green-100 p-4 rounded shadow col-span-1">
                    <h2 className="font-bold capitalize">
                        {`Mês Atual - ${getMonthName(mesAtualDate)}`}
                    </h2>

                    <p className="text-3xl">
                        {totalAtual}
                    </p>
                </div>

                <div className="bg-blue-100 p-4 rounded shadow col-span-1">
                    <h2 className="font-bold capitalize">
                        {`Mês Anterior - ${getMonthName(mesAnteriorDate)}`}
                    </h2>

                    <p className="text-3xl">
                        {totalAnterior}
                    </p>
                </div>

                <div className="bg-yellow-100 p-4 rounded shadow col-span-1">
                    <h2 className="font-bold capitalize">
                        {getMonthName(mesAnterior2Date)}
                    </h2>

                    <p className="text-3xl">
                        {totalAnterior2}
                    </p>
                </div>

            </div>

            <h1 className="text-xl font-semibold">
                Analise Resumido G3
            </h1>

            <div className="grid grid-cols-6 gap-4">
                <div className="bg-green-100 p-4 rounded shadow col-span-1">
                    <h2 className="font-bold capitalize">
                        {`Mês Atual - ${getMonthName(mesAtualDate)}`}
                    </h2>

                    <p className="text-3xl">
                        {totalAtualG3}
                    </p>
                </div>

                <div className="bg-green-100 p-4 rounded shadow col-span-1">
                    <h2 className="font-bold capitalize">
                        {`Mês Anterior - ${getMonthName(mesAnteriorDate)}`}
                    </h2>

                    <p className="text-3xl">
                        {totalAnteriorG3}
                    </p>
                </div>

                <div className="bg-green-100 p-4 rounded shadow col-span-1">
                    <h2 className="font-bold capitalize">
                        {`Mês Anterior 2 - ${getMonthName(mesAnterior2Date)}`}
                    </h2>

                    <p className="text-3xl">
                        {totalAnterior2G3}
                    </p>
                </div>

            </div>

            {/* ===============================
        HISTÓRICO DE MANUTENÇÕES
    =============================== */}

            <h2 className="text-xl font-semibold">
                Histórico de Manutenção Recentes
            </h2>

            <div className="overflow-x-auto">

                <table className="min-w-full border border-gray-200 rounded">

                    {/* CABEÇALHO */}

                    <thead className="bg-gray-100">

                        <tr className="text-left">

                            <th className="p-3 border">OS</th>
                            <th className="p-3 border">Data</th>
                            <th className="p-3 border">Executor</th>
                            <th className="p-3 border">Fim do Serviço</th>
                            <th className="p-3 border">Mídia</th>
                            <th className="p-3 border">Serviços Executados</th>
                            <th className="p-3 border">Observação</th>

                        </tr>

                    </thead>

                    {/* CORPO DA TABELA */}

                    <tbody>

                        {manutencaoAtual?.results?.map((item: any) => {

                            const executor = getFieldValue(
                                item.field_values,
                                "EXECUTOR DO SERVIÇO"
                            );

                            const dataFim = getFieldValue(
                                item.field_values,
                                "DATA E HORA - FIM DE SERVIÇO"
                            );

                            const midia = getFieldValue(
                                item.field_values,
                                "MIDIA"
                            );

                            const observacao = getFieldValue(
                                item.field_values,
                                "OBSERVAÇÃO"
                            );

                            const servicosExecutados = getFieldValue(
                                item.field_values,
                                "SERVIÇO EXECUTADO"
                            );

                            return (

                                <tr
                                    key={item.id}
                                    className="hover:bg-gray-50"
                                >

                                    <td className="p-3 border">
                                        {item.document_number}
                                    </td>

                                    <td className="p-3 border">
                                        {formatDateBR(item.created_at)}
                                    </td>

                                    <td className="p-3 border">
                                        {executor}
                                    </td>

                                    <td className="p-3 border">
                                        {formatDateBR(dataFim)}
                                    </td>

                                    <td className="p-3 border">
                                        {midia}
                                    </td>

                                    <td className="p-3 border">
                                        {servicosExecutados}
                                    </td>

                                    <td className="p-3 border">
                                        {observacao}
                                    </td>

                                </tr>

                            );
                        })}

                    </tbody>

                </table>

            </div>
        </main>
    );
}