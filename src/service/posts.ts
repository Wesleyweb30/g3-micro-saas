export async function getPosts() {
    try {
        const res = await fetch(`${process.env.BASE_URL}/posts`, {
            method: 'GET',
             headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!res.ok) {
            throw new Error('Erro ao buscar os posts');
        }
        const data = await res.json();
        console.log('Posts buscados com sucesso:', data);
        return data;
    } catch (error) {
        console.error('Erro ao buscar os posts:', error);
        throw error;
    }
}
