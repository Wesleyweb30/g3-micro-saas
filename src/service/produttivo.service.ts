type Params = {
    page?: number,
    pageSize?: number,
    startDate?: string
    endDate?: string,
    userId?: number,
    formId?: number
}

export async function produttivoGet(endpoint: string) {
    const url = `${process.env.PRODUTTIVO_BASE_URL}/${endpoint}`;

    try {
        const res = await fetch(url,
            {
                headers: {
                    'accept': 'application/json',
                    'X-Auth-Login': process.env.PRODUTTIVO_LOGIN || '',
                    'X-Auth-Register': process.env.PRODUTTIVO_REGISTER || '',
                    'X-Auth-Token': process.env.PRODUTTIVO_TOKEN || ''
                },
                next: { revalidate: 60 }
            }
        );

        if (!res.ok) {
            throw new Error('Erro ao buscar dados do produttivo')
        }

        const data = await res.json();
        // console.log('Dados do Produttivo buscados com sucesso:', data);
        return data;

    } catch (error) {
        console.error('Erro inesperado:', error)
        throw error;
    }

}
export async function getProduttivoFormFillsManutencao(params?: Params) {
    const { page, pageSize, startDate, endDate, userId, formId } = params || {};
    const range = `${startDate} - ${endDate}`;
    return produttivoGet(`form_fills?page=${page || 1}&per_page=${pageSize || 30}&order_type=desc&range_time=${encodeURIComponent(range)}&form_fill[form_ids][]=${formId}&form_fill[user_ids][]=${userId ?? ''}&form_fill[is_valid]=true`);
}

