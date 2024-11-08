import { PrismaClient } from '@prisma/client';

import { v4 as uuidv4 } from 'uuid';

const prisma = new PrismaClient();

async function main() {
    // Insertar datos iniciales en la tabla users
    const user1 = await prisma.users.create({
        data: {
            nombre: 'John Doe',
            email: 'johndoe@example.com',
        },
    });

    const user2 = await prisma.users.create({
        data: {
            nombre: 'Jane Smith',
            email: 'janesmith@example.com',
        },
    });

    // Insertar datos iniciales en la tabla medio_de_pago
    const medioPago1 = await prisma.medio_de_pago.create({
        data: {
            nombre: 'Tarjeta de Crédito',
            descripcion: 'Pago mediante tarjeta de crédito',
        },
    });

    const medioPago2 = await prisma.medio_de_pago.create({
        data: {
            nombre: 'PayPal',
            descripcion: 'Pago mediante PayPal',
        },
    });

    const categoria = await prisma.categoria.create({
        data: {
            nombre: 'Electodomesticos',
            descripcion: 'Categoría de productos por defecto',
        },
    })

    const categoria_dos = await prisma.categoria.create({
        data: {
            nombre: 'Cocina',
            descripcion: 'Categoría de productos por defecto',
        },
    })

    const estado = await prisma.estado.create({
        data: {
            nombre: 'Pendiente',
            descripcion: 'Pedido en espera de ser procesado',
        }
    })

    const estado_dos = await prisma.estado.create({
        data: {
            nombre: 'Enviado',
            descripcion: 'Pedido ha sido procesado',
        }
    })

    const estado_tres = await prisma.estado.create({
        data: {
            nombre: 'Entregado',
            descripcion: 'Pedido ha sido procesado',
        }
    })

    const producto = await prisma.productos.create({
        data: {
            precio: 1000,
            descripcion: 'Lavadora de 5 kg',
            id_categoria: categoria.id,
            cantidad: 10,
            id_business: "10",
            imagen: uuidv4(),
            disponible: true,
            comision: '10',
        }
    })

    // Insertar un pedido de ejemplo en la tabla pedidos
    // await prisma.pedidos.create({
    //     data: {
    //         user_id: user1.id,
    //         medio_pago_id: medioPago1.id,
    //         comentario: 'Pedido inicial de ejemplo',
    //     },
    // });
}

main().then(async () => {
    await prisma.$disconnect();
}).catch(async (e) => {
    console.log("ERRROOOOOOOOOOOOOOOOOR");
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
});
