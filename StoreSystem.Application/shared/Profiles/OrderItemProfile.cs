using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using StoreSystem.Core.Entities;
using StoreSystem.Core.Models;

namespace StoreSystem.Application.shared.Profiles
{
    public class OrderItemProfile : Profile
    {
        public OrderItemProfile()
        {
            CreateMap<OrderItem, OrderItemModel>().ReverseMap();
        }
    }
}
