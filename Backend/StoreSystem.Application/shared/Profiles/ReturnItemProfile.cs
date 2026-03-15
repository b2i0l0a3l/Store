using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using StoreSystem.Core.Entities;
using StoreSystem.Core.Models;

namespace StoreSystem.Application.shared.Profiles
{
    public class ReturnItemProfile : Profile
    {
        public ReturnItemProfile()
        {
            CreateMap<ReturnItem, ReturnItemModel>().ReverseMap();
        }
    }
}
