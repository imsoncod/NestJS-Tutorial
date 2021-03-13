import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMovieDTO } from '../dto/create-movie-dto';
import { Movie } from '../entities/movie.entitiy';

@Injectable()
export class MoviesService {
    private movie: Movie[] = []

    getAll():Movie[]{
        return this.movie
    }

    getOne(id:number):Movie{
        const movie = this.movie.find(movie => movie.id === id)
        if(!movie){
            throw new NotFoundException(`Movie with ID ${id} not found.`)
        }
        return movie;
    }

    deleteOne(id:number):boolean{
        this.getOne(id)
        this.movie = this.movie.filter(movie => movie.id !== +id)
        return true
    }

    create(movieData:CreateMovieDTO){
         this.movie.push({
             id: this.movie.length+1,
             ...movieData
        })
    }

    update(id: number, updateData){
        const movie = this.getOne(id)
        this.deleteOne(id)
        this.movie.push({...movie, ...updateData})
        return updateData
    }

}
