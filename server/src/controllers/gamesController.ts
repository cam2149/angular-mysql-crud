import {Request, Response } from 'express';

import pool from '../database';

class GamesController {
    
    
    public async listOne(req: Request, res: Response): Promise<any>{
        const { id } = req.params;
        const games = await pool.query('SELECT * FROM games WHERE id = ?', [id]);
        if (games.length > 0){
            return res.json(games[0]);
        }
        console.log(games)
        res.status(404).json({text: 'El juego no exite!'});
    }
    
    public async update(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        await pool.query('UPDATE games SET ? WHERE id = ?',[req.body, id])
        res.json({message: 'El juego ha sido actualizado: ' + req.params.id });
    }
    
    public async list(req: Request, res: Response): Promise<void> {
        const games = await pool.query('SELECT * FROM games');
        res.json(games);
    }

    public async create (req: Request, res: Response): Promise<void> {
        await pool.query('INSERT INTO games set ?',[req.body])
        //console.log(req.body);
        //(await pool).query('DESCRIBE games');
        res.json({message:'Game Saved'});
    } 

    public async delete (req: Request, res: Response): Promise<void> {
        
        const { id } = req.params;
        await pool.query('DELETE FROM games WHERE id = ?', [id]);
        res.status(200).json({message: 'El juego fue eliminado!'});
    } 
}

 const gamesController = new GamesController();
export default gamesController;