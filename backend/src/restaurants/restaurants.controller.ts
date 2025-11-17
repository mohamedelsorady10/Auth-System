import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { RestaurantsService } from './restaurants.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { Restaurant } from './schemas/restaurant.schema';

@Controller('restaurants')
@UseGuards(JwtAuthGuard)
export class RestaurantsController {
  constructor(private readonly restaurantsService: RestaurantsService) {}

  @Get()
  async findAll(): Promise<{ restaurants: Restaurant[] }> {
    const restaurants = await this.restaurantsService.findAll();
    return { restaurants };
  }

  @Get('search')
  async search(@Query('query') query: string): Promise<{ restaurants: Restaurant[] }> {
    if (!query || query.trim() === '') {
      return { restaurants: [] };
    }
    const restaurants = await this.restaurantsService.search(query);
    return { restaurants };
  }

  @Get('cuisine/:cuisine')
  async findByCuisine(@Param('cuisine') cuisine: string): Promise<{ restaurants: Restaurant[] }> {
    const restaurants = await this.restaurantsService.findByCuisine(cuisine);
    return { restaurants };
  }

  @Get('borough/:borough')
  async findByBorough(@Param('borough') borough: string): Promise<{ restaurants: Restaurant[] }> {
    const restaurants = await this.restaurantsService.findByBorough(borough);
    return { restaurants };
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<{ restaurant: Restaurant | null }> {
    const restaurant = await this.restaurantsService.findById(id);
    return { restaurant };
  }
}
