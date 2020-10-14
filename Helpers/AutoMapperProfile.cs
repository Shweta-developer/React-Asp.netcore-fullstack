
using AutoMapper;
using WebApplication9.Entities;
using WebApplication9.Models;

namespace WebApplication9.Helpers
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<User, UserModel>();
            CreateMap<RegisterModel, User>();
            CreateMap<UpdateModel, User>();
        }
    }
}

