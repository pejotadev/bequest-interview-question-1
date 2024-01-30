import { app } from './app';
import blockchainRoutes from './modules/blockchain/routes/blockchain.routes';
import authRoutes from './modules/auth/routes/auth.routes';

// MIDLEWARES
import { errorMiddleware } from "./middlewares/error.middleware";

// ROUTES
app.use('/auth', authRoutes);
app.use('/blockchain', blockchainRoutes);

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK' });
});

app.use(errorMiddleware);

export default app;